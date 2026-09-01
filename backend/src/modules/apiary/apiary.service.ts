import { CreateApiaryDto } from "./dto/create-apiary.dto.js";
import { UpdateApiaryDto } from "./dto/update-apiary.dto.js";
import { apiaryRepository } from "./apiary.repository.js";
import { AppError } from "../../utils/app-error.js";

const getOwnedApiary = async (
  apiaryId: string,
  ownerId: string
) => {
  const apiary = await apiaryRepository.findById(apiaryId);

  if (!apiary) {
    throw new AppError("Apiary not found", 404);
  }

  if (apiary.ownerId !== ownerId) {
    throw new AppError(
      "You do not have access to this apiary",
      403
    );
  }

  return apiary;
};

export const apiaryService = {
  // Create
  async createApiary(
    ownerId: string,
    data: CreateApiaryDto
  ) {
    return apiaryRepository.create({
      ...data,
      ownerId,
    });
  },

  // Get all
  async getMyApiaries(ownerId: string) {
    return apiaryRepository.findAllByOwnerId(ownerId);
  },

  // Get one
  async getApiary(
    apiaryId: string,
    ownerId: string
  ) {
    return getOwnedApiary(apiaryId, ownerId);
  },

  // Update
  async updateApiary(
    apiaryId: string,
    ownerId: string,
    data: UpdateApiaryDto
  ) {
    await getOwnedApiary(apiaryId, ownerId);

    return apiaryRepository.update(
      apiaryId,
      data
    );
  },

  // Delete
  async deleteApiary(
    apiaryId: string,
    ownerId: string
  ) {
    await getOwnedApiary(apiaryId, ownerId);

    await apiaryRepository.delete(apiaryId);

    return {
      message: "Apiary deleted successfully",
    };
  },
};