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
      .max(100, "Custom breed must be at most 100 characters")
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
      .max(1000, "Notes must be at most 1000 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // OTHER → customBreed is required
    if (data.breed === "OTHER" && !data.customBreed) {
      ctx.addIssue({
        code: "custom",
        path: ["customBreed"],
        message: "Custom breed is required when breed is OTHER",
      });
    }

    // Other breeds → customBreed is not allowed
    if (
      data.breed !== undefined &&
      data.breed !== "OTHER" &&
      data.customBreed !== undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["customBreed"],
        message: "Custom breed is only allowed when breed is OTHER",
      });
    }
  });

export type UpdateQueenDto = z.infer<
  typeof updateQueenSchema
>;