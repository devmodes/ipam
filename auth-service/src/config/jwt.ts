export default {
  secret: process.env.JWT_SECRET || "secret",
  expire_in: process.env.JWT_TTL || "1h",
  refresh_in: process.env.JWT_REFRESH_TTL || "1d",
}