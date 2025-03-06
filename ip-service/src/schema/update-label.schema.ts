import { z } from "zod";

export const updateLabelSchema = z.object({
  label: z.string().min(1),
});