import { User } from "src/types/User";

export class LogsPolicy {
  static canView(user: User): boolean {
    const { role } = user;

    return role.name === "admin";
  }
}
