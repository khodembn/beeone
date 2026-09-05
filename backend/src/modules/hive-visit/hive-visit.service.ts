import { CreateHiveVisitDto } from "./dto/create-hive-visit.dto.js";
import { UpdateHiveVisitDto } from "./dto/update-hive-visit.dto.js";
import { hiveVisitRepository } from "./hive-visit.repository.js";
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

export const hiveVisitService = {
  // Create
  async createHiveVisit(
    hiveId: string,
    ownerId: string,
    data: CreateHiveVisitDto
  ) {
    await getOwnedHive(hiveId, ownerId);

    // Only one visit per hive per day
    const existingVisit =
      await hiveVisitRepository.findByHiveIdAndDate(
        hiveId,
        data.visitDate
      );

    if (existingVisit) {
      throw new AppError(
        "A visit for this hive already exists on this date",
        409
      );
    }

    return hiveVisitRepository.create({
      ...data,
      hiveId,
    });
  },

  // Get all
  async getMyHiveVisits(
    hiveId: string,
    ownerId: string
  ) {
    await getOwnedHive(hiveId, ownerId);

    return hiveVisitRepository.findAllByHiveId(
      hiveId
    );
  },

  // Get one
  async getHiveVisit(
    visitId: string,
    ownerId: string
  ) {
    const visit =
      await hiveVisitRepository.findById(
        visitId
      );

    if (!visit) {
      throw new AppError(
        "Hive visit not found",
        404
      );
    }

    await getOwnedHive(
      visit.hiveId,
      ownerId
    );

    return visit;
  },

  // Update
  async updateHiveVisit(
    visitId: string,
    ownerId: string,
    data: UpdateHiveVisitDto
  ) {
    const visit =
      await hiveVisitRepository.findById(
        visitId
      );

    if (!visit) {
      throw new AppError(
        "Hive visit not found",
        404
      );
    }

    await getOwnedHive(
      visit.hiveId,
      ownerId
    );

    // If visitDate is being changed,
    // check for another visit on the new date
    if (data.visitDate !== undefined) {
      const existingVisit =
        await hiveVisitRepository.findByHiveIdAndDate(
          visit.hiveId,
          data.visitDate
        );

      if (
        existingVisit &&
        existingVisit.id !== visitId
      ) {
        throw new AppError(
          "A visit for this hive already exists on this date",
          409
        );
      }
    }

    return hiveVisitRepository.update(
      visitId,
      data
    );
  },

  // Delete
  async deleteHiveVisit(
    visitId: string,
    ownerId: string
  ) {
    const visit =
      await hiveVisitRepository.findById(
        visitId
      );

    if (!visit) {
      throw new AppError(
        "Hive visit not found",
        404
      );
    }

    await getOwnedHive(
      visit.hiveId,
      ownerId
    );

    await hiveVisitRepository.delete(
      visitId
    );

    return {
      message: "Hive visit deleted successfully",
    };
  },
};