import { Router } from "express";
import { CarritoController } from "../controllers/carrito.controller";
import { CarritoService } from "../services/carrito.service";
import { AppDataSource } from "../../../config/db";
import { authenticateJWT, checkRole } from "../../auth/middleware/auth.middleware";

const carritoService = new CarritoService(AppDataSource);
const carritoController = new CarritoController(carritoService);

const router = Router();

/**
 * ADMIN: ver todos los carritos
 */
router.get(
  "/admin",
  authenticateJWT,
  checkRole("Administrador"),
  async (_req, res) => {
    const carritos = await carritoService.obtenerTodosLosCarritos();
    res.json(carritos);
  }
);

/**
 * CLIENTE: ver SU carrito (ID sale del JWT)
 */
router.get(
  "/",
  authenticateJWT,
  checkRole("Cliente"),
  carritoController.obtenerCarrito.bind(carritoController)
);

/**
 * CLIENTE: agregar producto
 */
router.post(
  "/add",
  authenticateJWT,
  checkRole("Cliente"),
  carritoController.agregarProducto.bind(carritoController)
);

/**
 * CLIENTE: eliminar producto
 */
router.delete(
  "/remove/:detalle_id",
  authenticateJWT,
  checkRole("Cliente"),
  carritoController.eliminarProducto.bind(carritoController)
);

/**
 * CLIENTE: vaciar carrito
 */
router.delete(
  "/clear",
  authenticateJWT,
  checkRole("Cliente"),
  carritoController.vaciarCarrito.bind(carritoController)
);

export default router;

