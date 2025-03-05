export type ActivityLog = {
  id: string;
  level: string;
  message: string;
  resource: "Auth" | "IP";
  resource_id: string;
  meta: any;
  created_at: Date;
};
