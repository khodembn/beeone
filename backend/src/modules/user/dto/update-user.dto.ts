import { z } from "zod";

export const updateUserSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100)
      .optional(),

    email: z
      .string()
      .email("Invalid email address")
      .optional(),

    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .max(20)
      .optional(),
  })
  .refine(
    (data) =>
      data.fullName !== undefined ||
      data.email !== undefined ||
      data.phoneNumber !== undefined,
    {
      message: "At least one field must be provided",
    }
  );

export type UpdateUserDto = z.infer<typeof updateUserSchema>;