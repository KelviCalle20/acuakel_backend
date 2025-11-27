import { Request, Response } from "express";
import { CarritoService } from "../services/carrito.service";

export class CarritoController {
  constructor(private carritoService: CarritoService) {}

  agregarProducto = async (req: Request, res: Response) => {
    const { usuario_id, producto_id, cantidad } = req.body;
    try {
      const detalle = await this.carritoService.agregarProducto(usuario_id, producto_id, cantidad);
      res.status(200).json({ message: "Producto agregado correctamente", detalle });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  obtenerCarrito = async (req: Request, res: Response) => {
    const usuarioId = parseInt(req.params.usuario_id);
    try {
      const carrito = await this.carritoService.obtenerCarrito(usuarioId);
      res.json(carrito);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  eliminarProducto = async (req: Request, res: Response) => {
    const detalleId = parseInt(req.params.detalle_id);
    try {
      await this.carritoService.eliminarProducto(detalleId);
      res.json({ message: "Producto eliminado correctamente." });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  vaciarCarrito = async (req: Request, res: Response) => {
    const usuarioId = parseInt(req.params.usuario_id);
    try {
      await this.carritoService.vaciarCarrito(usuarioId);
      res.json({ message: "Carrito vaciado correctamente." });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
