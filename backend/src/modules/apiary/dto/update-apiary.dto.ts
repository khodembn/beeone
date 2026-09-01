import { z } from "zod";

export const updateApiarySchema = z
  .object({
    name: z
      .string()
      .min(2, "Apiary name must be at least 2 characters")
      .max(100)
      .optional(),

    location: z
      .string()
      .min(2, "Location is required")
      .max(255)
      .optional(),

    latitude: z
      .number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
      .optional(),

    longitude: z
      .number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180")
      .optional(),

    description: z
      .string()
      .max(1000)
      .optional(),
  })

    .refine(
    (data) => {
      const hasLatitude = data.latitude !== undefined;
      const hasLongitude = data.longitude !== undefined;

      return hasLatitude === hasLongitude;
    },
    {
      message: "Latitude and longitude must be provided together",
      path: ["latitude"],
    }
  )
  
  .refine(
    (data) =>
      data.name !== undefined ||
      data.location !== undefined ||
      data.latitude !== undefined ||
      data.longitude !== undefined ||
      data.description !== undefined,
    {
      message: "At least one field must be provided",
    }
  );

export type UpdateApiaryDto = z.infer<
  typeof updateApiarySchema
>;