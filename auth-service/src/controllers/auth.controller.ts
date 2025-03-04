import config from "@utils/config";
import { UnauthorizedException, UnprocessableEntitiesException } from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { Created, Successful } from "@utils/success";
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
    next(new UnauthorizedException("Incorrect email or password"));
  }

  if (!compareSync(password, (user as any).password)) {
    next(new UnauthorizedException("Incorrect email or password"));
  }

  const secret: any = config("jwt.secret");
  const expiresIn: any = config("jwt.expire_in");
  const refreshIn: any = config("jwt.refresh_in");

  const accessToken = jwt.sign({
    user: user,
  }, secret, { expiresIn: expiresIn });

  const refreshToken = jwt.sign({
    user,
  }, secret, {expiresIn: refreshIn});

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

    const refreshToken = req.cookies.jwt;

    const secret: jwt.Secret = config("jwt.secret");
    const expiresIn: any = config("jwt.expire_in");

    const { user } = jwt.verify(refreshToken, secret) as jwt.JwtPayload;

    const accessToken = jwt.sign({
      user: user,
    }, secret, { expiresIn: expiresIn });

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