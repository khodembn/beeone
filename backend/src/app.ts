import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { userRoutes } from "./modules/user/index.js";
import apiaryRoutes from "./modules/apiary/apiary.routes.js";
import hiveRoutes from "./modules/hive/hive.routes.js";
import hiveFrameRoutes from "./modules/hive-frame/hive-frame.routes.js";
import queenRoutes from "./modules/queen/queen.routes.js";
import hiveVisitRoutes from "./modules/hive-visit/hive-visit.routes.js";

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
app.use("/api", hiveFrameRoutes);
app.use("/api", queenRoutes);
app.use("/api", hiveVisitRoutes);


app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);
export default app;