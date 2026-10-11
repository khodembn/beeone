
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { DiseaseType } from "../../generated/prisma/client.js";

export const diseaseRepository = {
  // Create Disease
  async create(data: Prisma.DiseaseUncheckedCreateInput) {
    return prisma.disease.create({
      data,
    });
  },

  // Get all Diseases of a Hive Visit
  async findAllByHiveVisitId(hiveVisitId: string) {
    return prisma.disease.findMany({
      where: { hiveVisitId },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Find Disease by Type and Hive Visit
  async findByTypeAndHiveVisitId(
    hiveVisitId: string,
    diseaseType: DiseaseType
  ) {
    return prisma.disease.findUnique({
      where: {
        hiveVisitId_diseaseType: {
          hiveVisitId,
          diseaseType,
        },
      },
    });
  },

  // Get one Disease
  async findById(id: string) {
    return prisma.disease.findUnique({
      where: { id },
    });
  },

  // Update Disease
  async update(
    id: string,
    data: Prisma.DiseaseUpdateInput
  ) {
    return prisma.disease.update({
      where: { id },
      data,
    });
  },

  // Delete Disease
  async delete(id: string) {
    return prisma.disease.delete({
      where: { id },
    });
  },
};
