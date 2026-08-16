import  prisma from "../../lib/prisma.js";

export const authRepository = {
  async createUser(data: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    passwordHash: string;
  }) {
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        passwordHash: data.passwordHash,
      },
    });
  },

  async findByIdentifier(identifier: string) {
    return prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phoneNumber: identifier },
        ],
      },
    });
  },

  // Find user by ID with password hash
  async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });
  },

  // Update user's password
  async updatePassword(
    userId: string,
    passwordHash: string
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      },
      select: {
        id: true,
      },
    });
  },
};