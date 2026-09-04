import { CreateHiveFrameDto } from "./dto/create-hive-frame.dto.js";
import { UpdateHiveFrameDto } from "./dto/update-hive-frame.dto.js";
import { hiveFrameRepository } from "./hive-frame.repository.js";
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

export const hiveFrameService = {

  // Create
  async createHiveFrame(
    hiveId: string,
    ownerId: string,
    data: CreateHiveFrameDto
  ) {
    await getOwnedHive(hiveId, ownerId);

    return hiveFrameRepository.create({
      ...data,
      hiveId,
    });
  },

  // Get all
  async getMyHiveFrames(
    hiveId: string,
    ownerId: string
  ) {
    await getOwnedHive(hiveId, ownerId);

    return hiveFrameRepository.findAllByHiveId(hiveId);
  },

  // Get one
  async getHiveFrame(
    frameId: string,
    ownerId: string
  ) {
    const frame = await hiveFrameRepository.findById(frameId);

    if (!frame) {
      throw new AppError("Hive frame not found", 404);
    }

    await getOwnedHive(frame.hiveId, ownerId);

    return frame;
  },

  // Update
  async updateHiveFrame(
    frameId: string,
    ownerId: string,
    data: UpdateHiveFrameDto
  ) {
    const frame = await hiveFrameRepository.findById(frameId);

    if (!frame) {
      throw new AppError("Hive frame not found", 404);
    }

    await getOwnedHive(frame.hiveId, ownerId);

    const finalFrameType =
      data.frameType ?? frame.frameType;

    // OTHER → customFrame is required
    if (
      finalFrameType === "OTHER" &&
      data.customFrame === undefined &&
      !frame.customFrame
    ) {
      throw new AppError(
        "Custom frame is required when frame type is OTHER",
        400
      );
    }

    // Non-OTHER → customFrame is not allowed
    if (
      finalFrameType !== "OTHER" &&
      data.customFrame !== undefined
    ) {
      throw new AppError(
        "Custom frame is only allowed when frame type is OTHER",
        400
      );
    }

    const updateData = {
      ...data,

      // Remove customFrame when changing
      // from OTHER to another frame type
      ...(finalFrameType !== "OTHER" && {
        customFrame: null,
      }),
    };

    return hiveFrameRepository.update(
      frameId,
      updateData
    );
  },

  // Delete
  async deleteHiveFrame(
    frameId: string,
    ownerId: string
  ) {
    const frame = await hiveFrameRepository.findById(frameId);

    if (!frame) {
      throw new AppError("Hive frame not found", 404);
    }

    await getOwnedHive(frame.hiveId, ownerId);

    await hiveFrameRepository.delete(frameId);

    return {
      message: "Hive frame deleted successfully",
    };
  },
};