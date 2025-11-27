import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controller";

const router = Router();

router.get("/", PedidoController.getAll);
router.get("/:id", PedidoController.getById);
router.post("/", PedidoController.create);
router.put("/:id/estado", PedidoController.updateEstado);
router.delete("/:id/:usuarioId", PedidoController.delete);

export default router;


