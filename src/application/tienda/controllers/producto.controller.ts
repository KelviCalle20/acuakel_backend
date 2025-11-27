import { Request, Response } from "express";
import { ProductoService } from "../services/producto.service";

const productoService = new ProductoService();

export class ProductoController {
  async getAll(_req: Request, res: Response) {
    try {
      const productos = await productoService.getAll();
      res.json(productos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newProducto = await productoService.create(req.body);
      res.status(201).json({ message: "Producto registrado", producto: newProducto });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al crear producto" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const producto = await productoService.update(Number(id), req.body);
      res.json({ message: "Producto actualizado", producto });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al actualizar producto" });
    }
  }

  async changeStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { estado } = req.body;
    try {
      const producto = await productoService.changeStatus(Number(id), estado);
      res.json({ message: `Producto ${estado ? "activado" : "desactivado"}`, producto });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al cambiar estado" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await productoService.delete(Number(id));
      res.json({ message: "Producto eliminado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  }
}
