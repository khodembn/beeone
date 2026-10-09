import prisma from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

export const queenRepository = {
  // Create Queen
  async create(data: Prisma.QueenUncheckedCreateInput) {
    return prisma.queen.create({
      data,
    });
  },

  // Get all Queens of a Hive
  async findAllByHiveId(hiveId: string) {
    return prisma.queen.findMany({
      where: { hiveId },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Get one Queen
  async findById(id: string) {
    return prisma.queen.findUnique({
      where: { id },
    });
  },

  // Find active Queen of a Hive
  async findActiveByHiveId(hiveId: string) {
    return prisma.queen.findFirst({
      where: {
        hiveId,
        status: "ACTIVE",
      },
    });
  },

  // Update Queen
  async update(
    id: string,
    data: Prisma.QueenUpdateInput
  ) {
    return prisma.queen.update({
      where: { id },
      data,
    });
  },

  // Delete Queen
  async delete(id: string) {
    return prisma.queen.delete({
      where: { id },
    });
  },
};