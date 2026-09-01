import  prisma  from "../../lib/prisma.js";

export const apiaryRepository = {
  // Create Apiary
  async create(data: {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    description?: string;
    ownerId: string;
  }) {
    return prisma.apiary.create({
      data: {
        name: data.name,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
        ownerId: data.ownerId,
      },
    });
  },

  // Get all Apiaries of a user
  async findAllByOwnerId(ownerId: string) {
    return prisma.apiary.findMany({
      where: {
        ownerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Get one Apiary
  async findById(id: string) {
    return prisma.apiary.findUnique({
      where: {
        id,
      },
    });
  },

  // Update Apiary
  async update(
    id: string,
    data: {
      name?: string;
      location?: string;
      latitude?: number;
      longitude?: number;
      description?: string;
    }
  ) {
    return prisma.apiary.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Apiary
  async delete(id: string) {
    return prisma.apiary.delete({
      where: {
        id,
      },
    });
  },
};