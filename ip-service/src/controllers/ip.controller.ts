import { NotFoundException, UnauthorizedException } from "@utils/exceptions";
import { generateLogMeta, logger } from "@utils/logger";
import { prismaClient } from "@utils/prisma";
import { Created, Successful } from "@utils/success";
import { NextFunction, Request, Response } from "express";
import { IPAddressPolicy } from "src/policies/ip-address.policy";
import { User } from "src/types/User";

export const createIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label, ip, comment } = req.body;
  const user = req.user as User;

  const ipAddress = await prismaClient.ipAddress.create({
    data: {
      label,
      ip,
      comment,
      created_by: req.user?.id as string,
    },
  });

  logger.info(`The IP: ${ipAddress.ip} was created by ${user.name}`, generateLogMeta({ id: ipAddress.id }));

  next(new Created(ipAddress, "IP Address created successfully"));
};

export const getIPAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ipAddresses = await prismaClient.ipAddress.findMany();

  next(new Successful(ipAddresses));
};

export const getIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const ipAddress = await prismaClient.ipAddress.findFirst({
    where: {
      id,
    },
  });

  if (!ipAddress) {
    throw new NotFoundException();
  }

  next(new Successful(ipAddress));
};

export const updateIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = req.user as User;

  let prevRecord = await prismaClient.ipAddress.findFirst({
    where: {
      id,
    },
  });

  if (!prevRecord) {
    throw new NotFoundException();
  }

  if (!IPAddressPolicy.canUpdate(user, prevRecord)) {
    throw new UnauthorizedException();
  }

  const ipAddress = await prismaClient.ipAddress.update({
    where: {
      id: prevRecord.id,
    },
    data: {
      ...req.body,
    },
  });

  const prev = {
    id: prevRecord.id,
    ip: prevRecord.ip,
    label: prevRecord.label,
    comment: prevRecord.comment,
  };

  const newIp = {
    id: ipAddress.id,
    ip: ipAddress.ip,
    label: ipAddress.label,
    comment: ipAddress.comment,
  };

  // Make sure to only log it if there are really changes to the reord
  if (JSON.stringify(prev) !== JSON.stringify(newIp)) {
    const logMeta = {
      id: ipAddress.id,
      meta: {
        from: {
          ip: ipAddress.ip,
          label: ipAddress.label,
          comment: ipAddress.comment,
        },
        to: {
          ip: prevRecord.ip,
          label: prevRecord.label,
          comment: prevRecord.comment,
        },
      }
    }

    logger.info(`IP: ${prevRecord.ip} was updated by ${user.name}`, generateLogMeta(logMeta));
  }

  next(new Successful(ipAddress));
};

export const deleteIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = req.user as User;

  let ipAddress = await prismaClient.ipAddress.findFirst({
    where: {
      id,
    },
  });

  if (!ipAddress) {
    throw new NotFoundException();
  }

  await prismaClient.ipAddress.delete({
    where: {
      id,
    },
  });

  logger.info(`IP: ${ipAddress.ip} was deleted by ${user.name}`);

  next(new Successful(null));
};
