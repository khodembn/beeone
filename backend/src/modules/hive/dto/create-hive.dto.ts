import { z } from "zod";

export const createHiveSchema = z.object({
  hiveNumber: z
    .string()
    .min(1, "Hive number is required")
    .max(50, "Hive number must be at most 50 characters"),

  hiveType: z.enum([
    "LANGSTROTH",
    "NAJAFABADI",
    "DADANT",
    "TRADITIONAL",
    "FOAM",
    "OTHER",
  ]),

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

export type CreateHiveDto = z.infer<
  typeof createHiveSchema
>;