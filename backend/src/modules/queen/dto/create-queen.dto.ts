import { z } from "zod";

export const createQueenSchema = z
  .object({
    breed: z.enum([
      "CARNIOLAN",
      "ITALIAN",
      "CAUCASIAN",
      "BUCKFAST",
      "IRANIAN_NATIVE",
      "OTHER",
    ]),

    customBreed: z
      .string()
      .trim()
      .min(1, "Custom breed is required")
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
      data.breed !== "OTHER" &&
      data.customBreed !== undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["customBreed"],
        message: "Custom breed is only allowed when breed is OTHER",
      });
    }

    // endedAt cannot be before introducedAt
    if (
      data.endedAt &&
      data.introducedAt &&
      data.endedAt < data.introducedAt
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endedAt"],
        message: "Ended date cannot be before introduced date",
      });
    }

    // endedAt cannot be before birthDate
    if (
      data.endedAt &&
      data.birthDate &&
      data.endedAt < data.birthDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endedAt"],
        message: "Ended date cannot be before birth date",
      });
    }
  });

export type CreateQueenDto = z.infer<
  typeof createQueenSchema
>;