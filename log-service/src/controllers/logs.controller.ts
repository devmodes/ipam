import { prismaClient } from "@utils/prisma";
import { Created, Successful } from "@utils/success";
import { NextFunction, Request, Response } from "express";

export const addLog = async (req: Request, _: Response, next: NextFunction) => {
  const body = req.body;

  const { id, level, message, resource, meta } = body;

  const data = {
    resource_id: id,
    resource,
    level,
    message,
    meta,
  };

  await prismaClient.log.create({
    data: data
  });

  next(new Created("Logged successfully"));
};

export const getLogs = async (req: Request, res: Response, next: NextFunction) => {
  const { search, sort } = req.query;

  let filters: any = {
    orderBy: {
      created_at: sort as "asc" | "desc" || "desc",
    }
  };

  if (search) {
    filters = {
      ...filters,
      where: {
        message: {
          search: search as string,
        }
      },
    }
  }

  const logs = await prismaClient.log.findMany(filters);

  next(new Successful(logs, "Logs Fetched successfully"));
}