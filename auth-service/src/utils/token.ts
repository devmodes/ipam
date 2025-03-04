import jwt, { type Secret, type JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import config from "./config";
import { prismaClient } from "./prisma";

type TokensType = {
  accessToken: string;
  refreshToken: string;
}

export class Token {
  private user: User;
  private secret: Secret = config("jwt.secret");
  private ttl: any = config("jwt.expire_in");
  private refreshTtl: any = config("jwt.refresh_in");

  constructor(user: User) {
    this.user = user;
  }

  async generate(): Promise<TokensType> {
    // Generate Access and Refresh token
    const accessToken = jwt.sign({user: this.user} as JwtPayload, this.secret, { expiresIn: this.ttl });
    const refreshToken = jwt.sign({user: this.user} as JwtPayload, this.secret, { expiresIn: this.refreshTtl });

    // Attach the tokens to user in the database
    const data = {
      access: accessToken,
      refresh: refreshToken,
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
      refreshToken,
    };
  }

  async validateAccess(token: string): Promise<User | Boolean> {
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

  async validateRefresh(token: string): Promise<Boolean> {
    try {
      // Check if the refresh token is valid
      const { user } = jwt.verify(token, this.secret) as JwtPayload;

      if (!user) {
        return false;
      }

      // Check if it matches with the user in the process
      if (user.id !== this.user.id) {
        return false;
      }

      // Check if it is the current refresh token of the user
      await prismaClient.token.findFirstOrThrow({
        where: {
          user_id: this.user.id,
          refresh: token,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
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