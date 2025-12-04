// src/application/estadisticas/routes/estadisticas.routes.ts
import { Router } from "express";
import { EstadisticasController } from "../controllers/estadistica.controller";

const router = Router();
const controller = new EstadisticasController();

// ENDPOINTS
router.get("/usuarios", controller.usuarios.bind(controller));
router.get("/productos", controller.productos.bind(controller));
router.get("/categorias", controller.categorias.bind(controller));
router.get("/pedidos", controller.pedidos.bind(controller));

export default router;
