import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./dto/register.dto.js";
import { loginSchema } from "./dto/login.dto.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

export default router;