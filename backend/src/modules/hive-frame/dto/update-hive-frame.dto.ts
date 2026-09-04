import { z } from "zod";

export const updateHiveFrameSchema = z
  .object({
    frameType: z
      .enum([
        "BROOD",
        "HONEY",
        "POLLEN",
        "EMPTY",
        "DRAWN_COMB",
        "FOUNDATION",
        "OTHER",
      ])
      .optional(),

    customFrame: z
      .string()
      .trim()
      .min(1, "Custom frame cannot be empty")
      .max(100, "Custom frame must be at most 100 characters")
      .optional(),

    count: z
      .number()
      .int("Count must be an integer")
      .min(1, "Count must be at least 1")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // If frameType is OTHER, customFrame must be provided
    if (data.frameType === "OTHER" && !data.customFrame) {
      ctx.addIssue({
        code: "custom",
        path: ["customFrame"],
        message: "Custom frame is required when frame type is OTHER",
      });
    }

    // If frameType is not OTHER, customFrame is not allowed
    if (
      data.frameType !== undefined &&
      data.frameType !== "OTHER" &&
      data.customFrame !== undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["customFrame"],
        message: "Custom frame is only allowed when frame type is OTHER",
      });
    }
  });

export type UpdateHiveFrameDto = z.infer<
  typeof updateHiveFrameSchema
>;