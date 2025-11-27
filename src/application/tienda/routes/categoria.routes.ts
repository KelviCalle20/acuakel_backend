import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const router = Router();
const controller = new CategoriaController();

// GET /api/categories
router.get("/", controller.getAll.bind(controller));

// POST /api/categories
router.post("/", controller.create.bind(controller));

// PUT /api/categories/:id
router.put("/:id", controller.update.bind(controller));

// PATCH /api/categories/:id/status
router.patch("/:id/status", controller.changeStatus.bind(controller));

export default router;



