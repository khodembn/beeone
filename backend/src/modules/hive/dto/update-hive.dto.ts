import { z } from "zod";

export const updateHiveSchema = z.object({
  hiveNumber: z
    .string()
    .min(1, "Hive number is required")
    .max(50, "Hive number must be at most 50 characters")
    .optional(),

  hiveType: z
    .enum([
      "LANGSTROTH",
      "NAJAFABADI",
      "DADANT",
      "TRADITIONAL",
      "FOAM",
      "OTHER",
    ])
    .optional(),

  hiveStatus: z
    .enum([
      "ACTIVE",
      "INACTIVE",
      "MOVED",
      "MERGED",
      "DESTROYED",
    ])
    .optional(),

  installationDate: z.coerce
    .date()
    .optional(),

  notes: z
    .string()
    .max(1000, "Notes must be at most 1000 characters")
    .optional(),
});

export type UpdateHiveDto = z.infer<
  typeof updateHiveSchema
>;