import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
import { ChangePasswordDto } from "./dto/change-password.dto.js";
import { authRepository } from "./auth.repository.js";

import {
  hashPassword,
  comparePassword,
} from "../../utils/password.js";

import { generateToken } from "../../utils/jwt.js";
import { AppError } from "../../utils/app-error.js";


export const authService = {

  // Register
  async register(data: RegisterDto) {

    const existingPhone =
      await authRepository.findByIdentifier(data.phoneNumber);

    if (existingPhone) {
      throw new AppError(
        "Phone number is already registered",
        409
      );
    }

    if (data.email) {
      const existingEmail =
        await authRepository.findByIdentifier(data.email);

      if (existingEmail) {
        throw new AppError(
          "Email is already registered",
          409
        );
      }
    }

    const passwordHash =
      await hashPassword(data.password);

    const user =
      await authRepository.createUser({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        passwordHash,
      });

    return user;
  },


  // Login
  async login(data: LoginDto) {

    const user =
      await authRepository.findByIdentifier(
        data.identifier
      );

    if (!user) {
      throw new AppError(
        "Invalid email/phone number or password",
        401
      );
    }

    const isPasswordValid =
      await comparePassword(
        data.password,
        user.passwordHash
      );

    if (!isPasswordValid) {
      throw new AppError(
        "Invalid email/phone number or password",
        401
      );
    }

    const token =
      generateToken({
        userId: user.id,
        role: user.role,
      });

    return {
      user,
      token,
    };
  },


  // Change password
  async changePassword(
    userId: string,
    data: ChangePasswordDto
  ) {

    const user =
      await authRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const isCurrentPasswordValid =
      await comparePassword(
        data.currentPassword,
        user.passwordHash
      );

    if (!isCurrentPasswordValid) {
      throw new AppError(
        "Current password is incorrect",
        401
      );
    }

    const newPasswordHash =
      await hashPassword(data.newPassword);

    await authRepository.updatePassword(
      userId,
      newPasswordHash
    );

    return {
      message: "Password changed successfully",
    };
  },
};