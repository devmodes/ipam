import { IpAddress } from "@prisma/client";
import { User } from "src/types/User";

export class IPAddressPolicy {
  static canCreate(user: User): boolean {
    const { role } = user;

    return role.name === "admin" || role.name === "user";
  }

  static canView(user: User): boolean {
    const { role } = user;

    return role.name === "admin" || role.name === "user";
  }

  static canUpdate(user: User, record: IpAddress): boolean {
    const { id, role } = user;

    return role.name === "admin" || id === record.created_by;
  }

  static canDelete(user: User): boolean {
    const { role } = user;

    return role.name === "admin";
  }
}
