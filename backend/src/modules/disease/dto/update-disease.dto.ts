
import { z } from "zod";

export const updateDiseaseSchema = z
  .object({
    diseaseType: z
      .enum([
        "AMERICAN_FOULBROOD",
        "EUROPEAN_FOULBROOD",
        "VARROA",
        "NOSEMA",
        "CHALKBROOD",
        "SACBROOD",
        "VIRAL_DISEASE",
        "TRACHEAL_MITE",
        "WAX_MOTH",
        "MALNUTRITION",
        "POISONING",
        "BEE_EATER",
        "OTHER",
      ])
      .optional(),

    customDisease: z
      .string()
      .trim()
      .min(1, "Custom disease cannot be empty")
      .max(100, "Custom disease must be at most 100 characters")
      .optional(),

    severity: z
      .enum([
        "MILD",
        "MODERATE",
        "SEVERE",
        "CRITICAL",
      ])
      .optional(),

    symptoms: z
      .string()
      .trim()
      .max(2000, "Symptoms must be at most 2000 characters")
      .optional(),

    notes: z
      .string()
      .trim()
      .max(1000, "Notes must be at most 1000 characters")
      .optional(),

    diagnosisDate: z.coerce.date().optional(),

    isActive: z.boolean().optional(),
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

export type UpdateDiseaseDto = z.infer<
  typeof updateDiseaseSchema
>;
