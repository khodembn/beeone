import  prisma  from "../../lib/prisma.js";

export const userRepository = {
  // Get user by ID
  async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  // Check if email is already used by another user
  async findByEmail(email: string, excludeUserId?: string) {
    return prisma.user.findFirst({
      where: {
        email,
        ...(excludeUserId
          ? {
              NOT: {
                id: excludeUserId,
              },
            }
          : {}),
      },
    });
  },

  // Check if phone number is already used by another user
  async findByPhoneNumber(
    phoneNumber: string,
    excludeUserId?: string
  ) {
    return prisma.user.findFirst({
      where: {
        phoneNumber,
        ...(excludeUserId
          ? {
              NOT: {
                id: excludeUserId,
              },
            }
          : {}),
      },
    });
  },

  // Update user profile
  async updateUser(
    userId: string,
    data: {
      fullName?: string;
      email?: string;
      phoneNumber?: string;
    }
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  // Delete user
  async deleteUser(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  },
};