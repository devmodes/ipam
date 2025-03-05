import { User } from "@prisma/client";
import config from "@utils/config";
import { UnauthorizedException, UnprocessableEntitiesException } from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { Created, Successful } from "@utils/success";
import { Token } from "@utils/token";
import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";

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

  const { accessToken, refreshToken } = await token.generate();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  })

  next(new Successful({
    user: user,
    token: accessToken
  }));
}

export const me = async (req: Request, _: Response, next: NextFunction) => {
  next(new Successful(req.user));
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.jwt) {
      throw new UnauthorizedException();
    }

    const user = req.user as User;
    const refresh = req.cookies.jwt;

    const token = new Token(user);

    const verified = token.validateRefresh(refresh);

    if (!verified) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } = await token.generate();

    // Generate new access_token and refresh_token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    next(new Successful({
      user,
      token: accessToken,
    }));

  } catch (error) {
    throw new UnauthorizedException();
  }
}

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    const token = new Token(user);

    token.revoke();

    next(new Successful([], "Signed out successfully"));
  } catch (error) {
    next(new UnauthorizedException());
  }
}