import { z } from "zod";

export const updateHiveVisitSchema = z
  .object({
    // Date of the visit
    visitDate: z.coerce.date().optional(),

    // Exact time of the visit
    visitedAt: z.coerce.date().optional(),

    hasQueen: z.boolean().optional(),

    hasNectar: z.boolean().optional(),

    hasPollen: z.boolean().optional(),

    hasFeed: z.boolean().optional(),

    hasEggs: z.boolean().optional(),

    hasLarvae: z.boolean().optional(),

    hasPupae: z.boolean().optional(),

    populationStatus: z
      .enum([
        "WEAK",
        "MEDIUM",
        "STRONG",
        "VERY_STRONG",
      ])
      .optional(),

    hasDisease: z.boolean().optional(),

    notes: z
      .string()
      .trim()
      .max(1000, "Notes must be at most 1000 characters")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided",
    }
  );

export type UpdateHiveVisitDto = z.infer<
  typeof updateHiveVisitSchema
>;