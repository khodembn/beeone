import { UpdateUserDto } from "./dto/update-user.dto.js";
import { userRepository } from "./user.repository.js";
import { AppError } from "../../utils/app-error.js";

export const userService = {

  // Get current user's profile
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  },


  // Update current user's profile
  async updateProfile(
    userId: string,
    data: UpdateUserDto
  ) {

    // Check email uniqueness
    if (data.email) {
      const existingEmail =
        await userRepository.findByEmail(
          data.email,
          userId
        );

      if (existingEmail) {
        throw new AppError(
          "Email is already registered",
          409
        );
      }
    }


    // Check phone number uniqueness
    if (data.phoneNumber) {
      const existingPhone =
        await userRepository.findByPhoneNumber(
          data.phoneNumber,
          userId
        );

      if (existingPhone) {
        throw new AppError(
          "Phone number is already registered",
          409
        );
      }
    }


    const user =
      await userRepository.updateUser(
        userId,
        data
      );

    return user;
  },


  // Delete current user's account
  async deleteAccount(userId: string) {

    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    await userRepository.deleteUser(userId);

    return {
      message: "User account deleted successfully",
    };
  },
};