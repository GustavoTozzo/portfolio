import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  honeypot: z.string().optional(),
  startedAt: z.number(),
});
export type ContactForm = z.infer<typeof contactFormSchema>;
