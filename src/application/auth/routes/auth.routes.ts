// auth.routes.ts
import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.use("/", authController);

export default router;

