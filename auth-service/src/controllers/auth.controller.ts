import { User } from "@prisma/client";
import config from "@utils/config";
import { UnauthorizedException, UnprocessableEntitiesException } from "@utils/exceptions";
import { generateLogMeta, logger } from "@utils/logger";
import { prismaClient } from "@utils/prisma";
import { Created, Successful } from "@utils/success";
import { Token } from "@utils/token";
import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, _: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  
  const exists = await prismaClient.user.findFirst({
    where: {
      email,
    }
  });

  if (exists) {
    throw new UnprocessableEntitiesException("Unprocessable Entries", {
      email: "Email is already taken",
    });
  }

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      role: {
        connectOrCreate: {
          where: {
            name: 'user',
          },
          create: {
            name: 'user',
          }
        }
      }
    }
  });

  logger.info(`${user.name} created his account`, generateLogMeta({ id: user.id }));

  next(new Created(user, "User account created successfully"));
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
    include: {
      role: true,
    }
  });

  if (!user) {
    throw new UnauthorizedException("Incorrect email or password")
  }

  if (!compareSync(password, (user as any).password)) {
    throw new UnauthorizedException("Incorrect email or password")
  }

  const token = new Token(user as User);

  const { accessToken } = await token.generate();

  logger.info(`${user.name} Signed in to the platform`, generateLogMeta({ id: user.id }));

  next(new Successful({
    user: user,
    token: accessToken
  }));
}

export const me = async (req: Request, _: Response, next: NextFunction) => {
  next(new Successful(req.user));
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization as string;

  try {
    const token = bearerToken.split(" ")[1];
    const jwtSecret = config("jwt.secret") as string;

    // Verify the token to get the error code
    jwt.verify(token, jwtSecret);

    next(new Successful({message: "No need to refresh the token yet!"}));

  } catch (error: any) {
    if (error.name !== 'TokenExpiredError') {
      throw new UnauthorizedException();
    }

    // Get the token's owner
    const token = bearerToken.split(" ")[1];
    const tokenRecord = await prismaClient.token.findFirst({
      where: {
        access: token,
      }
    });

    if (!tokenRecord) {
      throw new UnauthorizedException();
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: tokenRecord.user_id,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // Get the refreshed token
    const _token = new Token(user);
    const refreshed = await _token.refresh(tokenRecord);

    if (!refreshed) {
      throw new UnauthorizedException("The token cannot be refreshed. please signin again");
    }

    // Return the refreshed token back to the client
    next(new Successful({ token: refreshed?.token, user: refreshed?.user }));
  }
}

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    const token = new Token(user);

    token.revoke();

    logger.info(`${user.name} Signed out of the platform`, generateLogMeta({ id: user.id }));

    next(new Successful([], "Signed out successfully"));
  } catch (error) {
    next(new UnauthorizedException());
  }
}