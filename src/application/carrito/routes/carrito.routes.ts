import { Router } from "express";
import { CarritoController } from "../controllers/carrito.controller";
import { CarritoService } from "../services/carrito.service";
import { AppDataSource } from "../../../config/db";

const carritoService = new CarritoService(AppDataSource);
const carritoController = new CarritoController(carritoService);

const router = Router();
router.get("/", async (req, res) => {
  const carritos = await carritoService.obtenerTodosLosCarritos(); // función nueva en el service
  res.json(carritos);
});

router.post("/add", carritoController.agregarProducto);
router.get("/:usuario_id", carritoController.obtenerCarrito);
router.delete("/remove/:detalle_id", carritoController.eliminarProducto);
router.delete("/clear/:usuario_id", carritoController.vaciarCarrito);

export default router;
