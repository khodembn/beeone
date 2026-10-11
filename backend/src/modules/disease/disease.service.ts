
import { CreateDiseaseDto } from "./dto/create-disease.dto.js";
import { UpdateDiseaseDto } from "./dto/update-disease.dto.js";
import { diseaseRepository } from "./disease.repository.js";
import { hiveVisitRepository } from "../hive-visit/hive-visit.repository.js";
import { hiveRepository } from "../hive/hive.repository.js";
import { apiaryRepository } from "../apiary/apiary.repository.js";
import { AppError } from "../../utils/app-error.js";
import { Prisma } from "../../generated/prisma/client.js";

const getOwnedHiveVisit = async (
  hiveVisitId: string,
  ownerId: string
) => {
  const visit = await hiveVisitRepository.findById(
    hiveVisitId
  );

  if (!visit) {
    throw new AppError("Hive visit not found", 404);
  }

  const hive = await hiveRepository.findById(
    visit.hiveId
  );

  if (!hive) {
    throw new AppError("Hive not found", 404);
  }

  const apiary = await apiaryRepository.findById(
    hive.apiaryId
  );

  if (!apiary) {
    throw new AppError("Apiary not found", 404);
  }

  if (apiary.ownerId !== ownerId) {
    throw new AppError(
      "You do not have access to this hive visit",
      403
    );
  }

  return visit;
};

export const diseaseService = {
  // Create Disease
  async createDisease(
    hiveVisitId: string,
    ownerId: string,
    data: CreateDiseaseDto
  ) {
    await getOwnedHiveVisit(hiveVisitId, ownerId);

    const existingDisease =
      await diseaseRepository.findByTypeAndHiveVisitId(
        hiveVisitId,
        data.diseaseType
      );

    if (existingDisease) {
      throw new AppError(
        "This disease type is already registered for this hive visit",
        409
      );
    }

    try {
        return await diseaseRepository.create({
            ...data,
            hiveVisitId,
        });
    } catch (error) {
      if (
         error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
    ) {
        throw new AppError(
        "This disease type is already registered for this hive visit",
        409
        );
     }

    throw error;
    }
  },

  // Get all Diseases of a Hive Visit
  async getMyDiseases(
    hiveVisitId: string,
    ownerId: string
  ) {
    await getOwnedHiveVisit(hiveVisitId, ownerId);

    return diseaseRepository.findAllByHiveVisitId(
      hiveVisitId
    );
  },

  // Get one Disease
  async getDisease(
    diseaseId: string,
    ownerId: string
  ) {
    const disease = await diseaseRepository.findById(
      diseaseId
    );

    if (!disease) {
      throw new AppError("Disease not found", 404);
    }

    await getOwnedHiveVisit(
      disease.hiveVisitId,
      ownerId
    );

    return disease;
  },

// Update Disease
async updateDisease(
  diseaseId: string,
  ownerId: string,
  data: UpdateDiseaseDto
) {
  const disease = await diseaseRepository.findById(
    diseaseId
  );

  if (!disease) {
    throw new AppError("Disease not found", 404);
  }

  await getOwnedHiveVisit(
    disease.hiveVisitId,
    ownerId
  );

  const finalDiseaseType =
    data.diseaseType ?? disease.diseaseType;

  const finalCustomDisease =
    finalDiseaseType === "OTHER"
      ? data.customDisease ?? disease.customDisease
      : undefined;

  // OTHER requires a custom disease name
  if (
    finalDiseaseType === "OTHER" &&
    !finalCustomDisease
  ) {
    throw new AppError(
      "Custom disease is required when diseaseType is OTHER",
      400
    );
  }

  // Custom disease is only allowed for OTHER
  if (
    finalDiseaseType !== "OTHER" &&
    data.customDisease !== undefined
  ) {
    throw new AppError(
      "Custom disease is only allowed when diseaseType is OTHER",
      400
    );
  }

  // Prevent duplicate disease types within the same visit
  const existingDisease =
    await diseaseRepository.findByTypeAndHiveVisitId(
      disease.hiveVisitId,
      finalDiseaseType
    );

  if (
    existingDisease &&
    existingDisease.id !== diseaseId
  ) {
    throw new AppError(
      "This disease type is already registered for this hive visit",
      409
    );
  }

  const updateData = {
    ...data,
    ...(finalDiseaseType !== "OTHER" && {
      customDisease: null,
    }),
  };

  // Handle duplicate constraint errors from the database
  try {
    return await diseaseRepository.update(
      diseaseId,
      updateData
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "This disease type is already registered for this hive visit",
        409
      );
    }

    throw error;
  }
},


  // Delete Disease
  async deleteDisease(
    diseaseId: string,
    ownerId: string
  ) {
    const disease = await diseaseRepository.findById(
      diseaseId
    );

    if (!disease) {
      throw new AppError("Disease not found", 404);
    }

    await getOwnedHiveVisit(
      disease.hiveVisitId,
      ownerId
    );

    await diseaseRepository.delete(diseaseId);

    return {
      message: "Disease deleted successfully",
    };
  },
};
