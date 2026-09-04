import prisma from "../../lib/prisma.js";

export const queenRepository = {
  // Create Queen

  async create(data: {
    breed:
      | "CARNIOLAN"
      | "ITALIAN"
      | "CAUCASIAN"
      | "BUCKFAST"
      | "IRANIAN_NATIVE"
      | "OTHER";

    customBreed?: string;

    birthDate?: Date;

    introducedAt?: Date;

    endedAt?: Date;

    status?:
      | "ACTIVE"
      | "REPLACED"
      | "LOST"
      | "DEAD";

    notes?: string;

    hiveId: string;
  }) {
    return prisma.queen.create({
      data: {
        breed: data.breed,
        customBreed: data.customBreed,
        birthDate: data.birthDate,
        introducedAt: data.introducedAt,
        endedAt: data.endedAt,
        status: data.status,
        notes: data.notes,
        hiveId: data.hiveId,
      },
    });
  },

  // Get all Queens of a Hive

  async findAllByHiveId(hiveId: string) {
    return prisma.queen.findMany({
      where: {
        hiveId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Get one Queen

  async findById(id: string) {
    return prisma.queen.findUnique({
      where: {
        id,
      },
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
    data: {
      breed?:
        | "CARNIOLAN"
        | "ITALIAN"
        | "CAUCASIAN"
        | "BUCKFAST"
        | "IRANIAN_NATIVE"
        | "OTHER";

      customBreed?: string | null;

      birthDate?: Date;

      introducedAt?: Date;

      endedAt?: Date | null;

      status?:
        | "ACTIVE"
        | "REPLACED"
        | "LOST"
        | "DEAD";

      notes?: string;
    }
  ) {
    return prisma.queen.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Queen

  async delete(id: string) {
    return prisma.queen.delete({
      where: {
        id,
      },
    });
  },
};