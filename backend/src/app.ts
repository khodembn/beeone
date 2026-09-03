import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { userRoutes } from "./modules/user/index.js";
import apiaryRoutes from "./modules/apiary/apiary.routes.js";
import hiveRoutes from "./modules/hive/hive.routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "BeeOne API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/apiaries", apiaryRoutes);
app.use("/api", hiveRoutes);

app.use(errorHandler);
export default app;