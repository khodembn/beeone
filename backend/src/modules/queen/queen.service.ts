import { CreateQueenDto } from "./dto/create-queen.dto.js";
import { UpdateQueenDto } from "./dto/update-queen.dto.js";
import { queenRepository } from "./queen.repository.js";
import { hiveRepository } from "../hive/hive.repository.js";
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

  const apiary = await apiaryRepository.findById(
    hive.apiaryId
  );

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

export const queenService = {
  // Create
  async createQueen(
    hiveId: string,
    ownerId: string,
    data: CreateQueenDto
  ) {
    await getOwnedHive(
      hiveId,
      ownerId
    );

    const finalStatus =
      data.status ?? "ACTIVE";

    // Only one ACTIVE Queen per Hive
    if (finalStatus === "ACTIVE") {
      const activeQueen =
        await queenRepository.findActiveByHiveId(
          hiveId
        );

      if (activeQueen) {
        throw new AppError(
          "This hive already has an active queen",
          409
        );
      }
    }

    return queenRepository.create({
      ...data,
      hiveId,
    });
  },

  // Get all
  async getMyQueens(
    hiveId: string,
    ownerId: string
  ) {
    await getOwnedHive(
      hiveId,
      ownerId
    );

    return queenRepository.findAllByHiveId(
      hiveId
    );
  },

  // Get one
  async getQueen(
    queenId: string,
    ownerId: string
  ) {
    const queen =
      await queenRepository.findById(
        queenId
      );

    if (!queen) {
      throw new AppError(
        "Queen not found",
        404
      );
    }

    await getOwnedHive(
      queen.hiveId,
      ownerId
    );

    return queen;
  },

  // Update
  async updateQueen(
    queenId: string,
    ownerId: string,
    data: UpdateQueenDto
  ) {
    const queen =
      await queenRepository.findById(
        queenId
      );

    if (!queen) {
      throw new AppError(
        "Queen not found",
        404
      );
    }

    await getOwnedHive(
      queen.hiveId,
      ownerId
    );

    const finalBreed =
      data.breed ?? queen.breed;

    const finalStatus =
      data.status ?? queen.status;

    // Final dates after merging
    // existing values with PATCH values
    const finalBirthDate =
      data.birthDate ?? queen.birthDate;

    const finalIntroducedAt =
      data.introducedAt ?? queen.introducedAt;

    const finalEndedAt =
      data.endedAt ?? queen.endedAt;

    // endedAt cannot be before introducedAt
    if (
      finalEndedAt &&
      finalIntroducedAt &&
      finalEndedAt < finalIntroducedAt
    ) {
      throw new AppError(
        "Ended date cannot be before introduced date",
        400
      );
    }

    // endedAt cannot be before birthDate
    if (
      finalEndedAt &&
      finalBirthDate &&
      finalEndedAt < finalBirthDate
    ) {
      throw new AppError(
        "Ended date cannot be before birth date",
        400
      );
    }

    // OTHER → customBreed is required
    if (
      finalBreed === "OTHER" &&
      data.customBreed === undefined &&
      !queen.customBreed
    ) {
      throw new AppError(
        "Custom breed is required when breed is OTHER",
        400
      );
    }

    // Non-OTHER → customBreed is not allowed
    if (
      finalBreed !== "OTHER" &&
      data.customBreed !== undefined
    ) {
      throw new AppError(
        "Custom breed is only allowed when breed is OTHER",
        400
      );
    }

    // Only one ACTIVE Queen per Hive
    if (
      finalStatus === "ACTIVE" &&
      queen.status !== "ACTIVE"
    ) {
      const activeQueen =
        await queenRepository.findActiveByHiveId(
          queen.hiveId
        );

      if (
        activeQueen &&
        activeQueen.id !== queenId
      ) {
        throw new AppError(
          "This hive already has an active queen",
          409
        );
      }
    }

    const updateData = {
      ...data,

      // Remove customBreed when changing
      // from OTHER to another breed
      ...(finalBreed !== "OTHER" && {
        customBreed: null,
      }),
    };

    return queenRepository.update(
      queenId,
      updateData
    );
  },

  // Delete
  async deleteQueen(
    queenId: string,
    ownerId: string
  ) {
    const queen =
      await queenRepository.findById(
        queenId
      );

    if (!queen) {
      throw new AppError(
        "Queen not found",
        404
      );
    }

    await getOwnedHive(
      queen.hiveId,
      ownerId
    );

    await queenRepository.delete(
      queenId
    );

    return {
      message: "Queen deleted successfully",
    };
  },
};