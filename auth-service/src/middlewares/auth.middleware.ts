import { Role, User } from "@prisma/client";
import config from "@utils/config";
import { UnauthorizedException } from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    console.log(bearerToken);

    if (!bearerToken) {
      next(new UnauthorizedException());
    }

    const token: string = bearerToken?.split(' ')[1] || '';
    const secret: any = config("jwt.secret");
    const decoded = jwt.verify(token, secret);
    const { user } = decoded as any;

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

    req.user = {
      ...userModel,
      role: userModel.role.name
    }

    next();
  } catch (error) {
    console.log('HEREEEE', error);
    next(new UnauthorizedException());
  }
}