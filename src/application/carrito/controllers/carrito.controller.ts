import { Request, Response } from "express";
import { CarritoService } from "../services/carrito.service";

export class CarritoController {
  constructor(private carritoService: CarritoService) {}

  // AGREGAR PRODUCTO (id del usuario sale del JWT)
  agregarProducto = async (req: any, res: Response) => {
    try {
      const usuarioId = req.user.id; // ✅ DEL JWT
      const { producto_id, cantidad } = req.body;

      const detalle = await this.carritoService.agregarProducto(
        usuarioId,
        producto_id,
        cantidad
      );

      res.status(200).json({
        message: "Producto agregado correctamente",
        detalle,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  // OBTENER CARRITO DEL CLIENTE LOGUEADO
  obtenerCarrito = async (req: any, res: Response) => {
    try {
      const usuarioId = req.user.id; // ✅ DEL JWT
      const carrito = await this.carritoService.obtenerCarrito(usuarioId);
      res.json(carrito);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  // ELIMINAR PRODUCTO DEL CARRITO
  eliminarProducto = async (req: Request, res: Response) => {
    try {
      const detalleId = parseInt(req.params.detalle_id);
      await this.carritoService.eliminarProducto(detalleId);

      res.json({ message: "Producto eliminado correctamente." });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  // VACIAR CARRITO DEL CLIENTE LOGUEADO
  vaciarCarrito = async (req: any, res: Response) => {
    try {
      const usuarioId = req.user.id; // ✅ DEL JWT
      await this.carritoService.vaciarCarrito(usuarioId);

      res.json({ message: "Carrito vaciado correctamente." });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}
