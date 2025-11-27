import { Router } from "express";
import { ProductoController } from "../controllers/producto.controller";

const router = Router();
const productoController = new ProductoController();

router.get("/", productoController.getAll.bind(productoController));
router.post("/", productoController.create.bind(productoController));
router.put("/:id", productoController.update.bind(productoController));
router.patch("/:id/status", productoController.changeStatus.bind(productoController));
router.delete("/:id", productoController.delete.bind(productoController));

export default router;


