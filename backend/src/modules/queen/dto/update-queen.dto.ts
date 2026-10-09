import { z } from "zod";

export const updateQueenSchema = z
  .object({
    breed: z
      .enum([
        "CARNIOLAN",
        "ITALIAN",
        "CAUCASIAN",
        "BUCKFAST",
        "IRANIAN_NATIVE",
        "OTHER",
      ])
      .optional(),

    customBreed: z
      .string()
      .trim()
      .min(1, "Custom breed cannot be empty")
      .max(
        100,
        "Custom breed must be at most 100 characters"
      )
      .optional(),

    birthDate: z.coerce.date().optional(),

    introducedAt: z.coerce.date().optional(),

    endedAt: z.coerce.date().optional(),

    status: z
      .enum([
        "ACTIVE",
        "REPLACED",
        "LOST",
        "DEAD",
      ])
      .optional(),

    notes: z
      .string()
      .trim()
      .max(
        1000,
        "Notes must be at most 1000 characters"
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["root"],
        message: "At least one field must be provided",
      });
    }
  });

export type UpdateQueenDto = z.infer<
  typeof updateQueenSchema
>;