import prisma from "../../lib/prisma.js";

export const hiveRepository = {
  // Create Hive
  async create(data: {
    hiveNumber: string;
    hiveType:
      | "LANGSTROTH"
      | "NAJAFABADI"
      | "DADANT"
      | "TRADITIONAL"
      | "FOAM"
      | "OTHER";
    hiveStatus?:
      | "ACTIVE"
      | "INACTIVE"
      | "MOVED"
      | "MERGED"
      | "DESTROYED";
    installationDate?: Date;
    notes?: string;
    apiaryId: string;
  }) {
    return prisma.hive.create({
      data: {
        hiveNumber: data.hiveNumber,
        hiveType: data.hiveType,
        hiveStatus: data.hiveStatus,
        installationDate: data.installationDate,
        notes: data.notes,
        apiaryId: data.apiaryId,
      },
    });
  },

  // Get all Hives of an Apiary
  async findAllByApiaryId(apiaryId: string) {
    return prisma.hive.findMany({
      where: {
        apiaryId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Get one Hive
  async findById(id: string) {
    return prisma.hive.findUnique({
      where: {
        id,
      },
    });
  },

  // Update Hive
  async update(
    id: string,
    data: {
      hiveNumber?: string;
      hiveType?:
        | "LANGSTROTH"
        | "NAJAFABADI"
        | "DADANT"
        | "TRADITIONAL"
        | "FOAM"
        | "OTHER";
      hiveStatus?:
        | "ACTIVE"
        | "INACTIVE"
        | "MOVED"
        | "MERGED"
        | "DESTROYED";
      installationDate?: Date;
      notes?: string;
    }
  ) {
    return prisma.hive.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Hive
  async delete(id: string) {
    return prisma.hive.delete({
      where: {
        id,
      },
    });
  },
};