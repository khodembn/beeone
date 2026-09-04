import prisma from "../../lib/prisma.js";

export const hiveFrameRepository = {
  // Create Hive Frame
  async create(data: {
    frameType:
      | "BROOD"
      | "HONEY"
      | "POLLEN"
      | "EMPTY"
      | "DRAWN_COMB"
      | "FOUNDATION"
      | "OTHER";
    customFrame?: string;
    count: number;
    hiveId: string;
  }) {
    return prisma.hiveFrame.create({
      data: {
        frameType: data.frameType,
        customFrame: data.customFrame,
        count: data.count,
        hiveId: data.hiveId,
      },
    });
  },

  // Get all Frames of a Hive
  async findAllByHiveId(hiveId: string) {
    return prisma.hiveFrame.findMany({
      where: {
        hiveId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Get one Hive Frame
  async findById(id: string) {
    return prisma.hiveFrame.findUnique({
      where: {
        id,
      },
    });
  },

  // Update Hive Frame
  async update(
    id: string,
    data: {
      frameType?:
        | "BROOD"
        | "HONEY"
        | "POLLEN"
        | "EMPTY"
        | "DRAWN_COMB"
        | "FOUNDATION"
        | "OTHER";
      customFrame?: string | null;
      count?: number;
    }
  ) {
    return prisma.hiveFrame.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Hive Frame
  async delete(id: string) {
    return prisma.hiveFrame.delete({
      where: {
        id,
      },
    });
  },
};