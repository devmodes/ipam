export default {
  port: process.env.APP_PORT,
  jwt_secret: process.env.JWT_SECRET,

  log_host: process.env.LOG_HOST || "localhost",
  log_port: process.env.LOG_PORT || 9090,
  log_path: process.env.LOG_PATH || "/logs",
};
