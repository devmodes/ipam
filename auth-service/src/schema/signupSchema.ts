import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
})
.refine((data) => data.password === data.password_confirmation, {
  message: "Passwords doesn't match",
  path: ["password_confirmation"],
});