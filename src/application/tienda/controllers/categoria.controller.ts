import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

const service = new CategoriaService();

export class CategoriaController {
  async getAll(_req: Request, res: Response) {
    try {
      const categorias = await service.getAll();
      res.json(categorias);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener categorías" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newCat = await service.create(req.body);
      res.status(201).json(newCat);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updated = await service.update(Number(id), req.body);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "No se pudo actualizar la categoría" });
    }
  }

  async changeStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { estado } = req.body;
    try {
      const updated = await service.changeStatus(Number(id), estado);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al cambiar estado" });
    }
  }
}

