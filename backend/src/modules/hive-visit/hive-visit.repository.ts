import prisma from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

export const hiveVisitRepository = {
  // Create Hive Visit
  async create(
    data: Prisma.HiveVisitUncheckedCreateInput
  ) {
    return prisma.hiveVisit.create({
      data,
    });
  },

  // Get all Visits of a Hive
  async findAllByHiveId(hiveId: string) {
    return prisma.hiveVisit.findMany({
      where: {
        hiveId,
      },
      orderBy: {
        visitDate: "desc",
      },
    });
  },

  // Get one Hive Visit
  async findById(id: string) {
    return prisma.hiveVisit.findUnique({
      where: {
        id,
      },
    });
  },

  // Find Visit by Hive and Date
  async findByHiveIdAndDate(
    hiveId: string,
    visitDate: Date
  ) {
    return prisma.hiveVisit.findUnique({
      where: {
        hiveId_visitDate: {
          hiveId,
          visitDate,
        },
      },
    });
  },

  // Update Hive Visit
  async update(
    id: string,
    data: Prisma.HiveVisitUpdateInput
  ) {
    return prisma.hiveVisit.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Hive Visit
  async delete(id: string) {
    return prisma.hiveVisit.delete({
      where: {
        id,
      },
    });
  },
};