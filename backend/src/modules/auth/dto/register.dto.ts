import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100),

  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(20),

  email: z
    .string()
    .email("Invalid email address")
    .optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type RegisterDto = z.infer<typeof registerSchema>;