import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
import { authRepository } from "./auth.repository.js";
import { ChangePasswordDto } from "./dto/change-password.dto.js";
import {
  hashPassword,
  comparePassword,
} from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";

export const authService = {
  async register(data: RegisterDto) {
    const existingUser = await authRepository.findByIdentifier(
      data.phoneNumber
    );

    if (existingUser) {
      throw new Error("Phone number is already registered");
    }

    if (data.email) {
      const existingEmail = await authRepository.findByIdentifier(
        data.email
      );

      if (existingEmail) {
        throw new Error("Email is already registered");
      }
    }

    const passwordHash = await hashPassword(data.password);

    const user = await authRepository.createUser({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      passwordHash,
    });

    return user;
  },

  async login(data: LoginDto) {
    const user = await authRepository.findByIdentifier(
      data.identifier
    );

    if (!user) {
      throw new Error("Invalid email/phone number or password");
    }

    const isPasswordValid = await comparePassword(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email/phone number or password");
    }
 const token = generateToken({
      userId: user.id,
      role: user.role,
    });
    return {   
     user,
     token,
    };
  },

 async changePassword(
  userId: string,
  data: ChangePasswordDto
) {
  const user = await authRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isCurrentPasswordValid = await comparePassword(
    data.currentPassword,
    user.passwordHash
  );

  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  const newPasswordHash = await hashPassword(
    data.newPassword
  );

  await authRepository.updatePassword(
    userId,
    newPasswordHash
  );

  return {
    message: "Password changed successfully",
  };
},
};

