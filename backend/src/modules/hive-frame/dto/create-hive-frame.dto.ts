import { z } from "zod";

export const createHiveFrameSchema = z
  .object({
    frameType: z.enum([
      "BROOD",
      "HONEY",
      "POLLEN",
      "EMPTY",
      "DRAWN_COMB",
      "FOUNDATION",
      "OTHER",
    ]),

    customFrame: z
      .string()
      .trim()
      .min(1, "Custom frame is required")
      .max(100, "Custom frame must be at most 100 characters")
      .optional(),

    count: z
      .number()
      .int("Count must be an integer")
      .min(1, "Count must be at least 1"),
  })
  .superRefine((data, ctx) => {
    // OTHER → customFrame is required
    if (data.frameType === "OTHER" && !data.customFrame) {
      ctx.addIssue({
        code: "custom",
        path: ["customFrame"],
        message: "Custom frame is required when frame type is OTHER",
      });
    }

    // Other types → customFrame is not allowed
    if (data.frameType !== "OTHER" && data.customFrame !== undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["customFrame"],
        message: "Custom frame is only allowed when frame type is OTHER",
      });
    }
  });

export type CreateHiveFrameDto = z.infer<
  typeof createHiveFrameSchema
>;