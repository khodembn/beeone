import { z } from "zod";

export const createApiarySchema = z.object({
  name: z
    .string()
    .min(2, "Apiary name must be at least 2 characters")
    .max(100),

  location: z
    .string()
    .min(2, "Location is required")
    .max(255),

  latitude: z
    .number()
    .min(25, "Latitude must be within Iran")
    .max(40, "Latitude must be within Iran"),

  longitude: z
    .number()
    .min(44, "Longitude must be within Iran")
    .max(64, "Longitude must be within Iran"),

  description: z
    .string()
    .max(1000)
    .optional(),
});

export type CreateApiaryDto = z.infer<
  typeof createApiarySchema
>;