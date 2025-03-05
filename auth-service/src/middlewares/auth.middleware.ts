import { Role, User } from "@prisma/client";
import config from "@utils/config";
import { UnauthorizedException } from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { Token } from "@utils/token";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(new UnauthorizedException());
    }

    const token: string = bearerToken?.split(' ')[1] || '';
    const secret: any = config("jwt.secret");
    const decoded = jwt.verify(token, secret);
    const { user } = decoded as any;
    console.log('USERRR: ', user);
    const userModel = await prismaClient.user.findFirst({
      where: {
        id: user.id,
      },
      include: {
        role: true,
      }
    }) as  User & {role: Role};

    if (!userModel) {
      next(new UnauthorizedException());
    }

    const _token = new Token(userModel);

    const verified = await _token.validateAccess(bearerToken as string);

    if(!verified) {
      next(new UnauthorizedException());
    }

    req.user = userModel;

    next();
  } catch (error) {
    console.log('HEREEEE', error);
    next(new UnauthorizedException());
  }
}