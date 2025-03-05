import jwt, { type Secret, type JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import config from "./config";
import { prismaClient } from "./prisma";
import { Token as TokenModel } from "@prisma/client";
import moment from "moment";

type TokensType = {
  accessToken: string;
}

type RefreshResponse = {
  user: User;
  token: string;
}

export class Token {
  private user: User;
  private secret: Secret = config("jwt.secret");
  private ttl: any = config("jwt.expire_in");
  private refresh_ttl: any = config("jwt.refresh_in") as number;

  constructor(user: User) {
    this.user = user;
  }

  async generate(): Promise<TokensType> {
    // Generate Access and Refresh token
    const accessToken = jwt.sign({user: this.user} as JwtPayload, this.secret, { expiresIn: this.ttl });

    // Attach the tokens to user in the database
    const data = {
      access: accessToken,
      user_id: this.user.id,
    };

    await prismaClient.token.upsert({
      where: {
        user_id: data.user_id,
      },
      update: data,
      create: data,
    });

    // Return the tokens for use cases
    return {
      accessToken,
    };
  }

  async validate(token: string): Promise<User | Boolean> {
    try {
      // Always pass the token with strategies like `Bearer <TokenString>`
      const bearerToken = token.split(' ')[1];
      
      // Check if the token is valid
      const { user } = jwt.verify(bearerToken, this.secret) as JwtPayload;

      if (!user) {
        return false;
      }

      // Check if it matches with the user in the process
      if (user.id !== this.user.id) {
        return false;
      }

      // Check if it is the current access token in the database
      const verifiedToken = await prismaClient.token.findFirstOrThrow({
        where: {
          user_id: this.user.id,
          access: bearerToken,
        }
      });

      // Get and return the user model which is the owner of the token

      return await prismaClient.user.findFirstOrThrow({
        where: {
          id: verifiedToken.user_id,
        },
        include: {
          role: true,
        }
      });

    } catch (error) {
      return false;
    }
  }

  async refresh(record: TokenModel): Promise<RefreshResponse | null> {
    const refreshable = this.refresh_ttl as number;
    const lastRefresh = record.refreshed_at;

    if (moment().subtract(refreshable, 'days') > moment(lastRefresh)) {
      return null;
    }

    const newToken = jwt.sign({ user: this.user }, this.secret, { expiresIn: this.ttl });

    await prismaClient.token.update({
      where: {
        id: record.id,
      },
      data: {
        access: newToken,
        refreshed_at: new Date(),
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: record.user_id,
      },
    }) as User;

    return {
      token: newToken,
      user,
    };
  }

  async revoke(): Promise<Boolean> {
    try {
      // Remove the token in the database to invalidate both access and refresh tokens
      await prismaClient.token.delete({
        where: {
          user_id: this.user.id,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}