import { Role } from "@lib/types/role";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
