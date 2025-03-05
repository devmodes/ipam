import winston from "winston";
import config from "./config";

const host: string = config("app.log_host");
const port: number = config("app.log_port");
const path: string = config("app.log_path");

export const generateLogMeta = (args: any) => {
  return {
    resource: "Auth",
    ...args
  }
}

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  defaultMeta: {
    resource: "Auth",
  },
  transports: [
    new winston.transports.Console({ level: 'error' }),
    new winston.transports.Http({
      host,
      port,
      path,
      level: 'info',
      format: winston.format.json(),
    })
  ]
});