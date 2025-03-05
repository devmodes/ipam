import config from "@utils/config";
import { UnauthorizedException } from "@utils/exceptions";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "src/types/User";

export const auth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(new UnauthorizedException());
    }

    const token = bearerToken?.split(" ")[1];
    const decoded: any = verify(token as string, config("jwt.secret"));
    const { user } = decoded;

    const userData: User = user;

    req.user = userData;

    next();
  } catch (error) {
    next(new UnauthorizedException());
  }
};
