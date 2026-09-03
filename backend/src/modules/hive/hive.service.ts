import { CreateHiveDto } from "./dto/create-hive.dto.js";
import { UpdateHiveDto } from "./dto/update-hive.dto.js";
import { hiveRepository } from "./hive.repository.js";
import { apiaryRepository } from "../apiary/apiary.repository.js";
import { AppError } from "../../utils/app-error.js";

const getOwnedHive = async (
  hiveId: string,
  ownerId: string
) => {
  const hive = await hiveRepository.findById(hiveId);

  if (!hive) {
    throw new AppError("Hive not found", 404);
  }

  const apiary = await apiaryRepository.findById(hive.apiaryId);

  if (!apiary) {
    throw new AppError("Apiary not found", 404);
  }

  if (apiary.ownerId !== ownerId) {
    throw new AppError(
      "You do not have access to this hive",
      403
    );
  }

  return hive;
};

export const hiveService = {

  // Create
  async createHive(
    apiaryId: string,
    ownerId: string,
    data: CreateHiveDto
  ) {
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

    return hiveRepository.create({
      ...data,
      apiaryId,
    });
  },

  // Get all
  async getMyHives(
    apiaryId: string,
    ownerId: string
  ) {
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

    return hiveRepository.findAllByApiaryId(apiaryId);
  },

  // Get one
  async getHive(
    hiveId: string,
    ownerId: string
  ) {
    return getOwnedHive(hiveId, ownerId);
  },

  // Update
  async updateHive(
    hiveId: string,
    ownerId: string,
    data: UpdateHiveDto
  ) {
    await getOwnedHive(hiveId, ownerId);

    return hiveRepository.update(
      hiveId,
      data
    );
  },

  // Delete
  async deleteHive(
    hiveId: string,
    ownerId: string
  ) {
    await getOwnedHive(hiveId, ownerId);

    await hiveRepository.delete(hiveId);

    return {
      message: "Hive deleted successfully",
    };
  },
};