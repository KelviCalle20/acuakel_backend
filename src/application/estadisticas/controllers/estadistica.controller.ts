// src/application/estadisticas/controllers/estadisticas.controller.ts
import { Request, Response } from "express";
import { EstadisticasService } from "../services/estadistica.service";

const estadisticasService = new EstadisticasService();

export class EstadisticasController {
  async usuarios(_req: Request, res: Response) {
    try {
      const data = await estadisticasService.getResumenUsuarios();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener estadísticas de usuarios" });
    }
  }

  async productos(_req: Request, res: Response) {
    try {
      const data = await estadisticasService.getResumenProductos();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener estadísticas de productos" });
    }
  }

  async categorias(_req: Request, res: Response) {
    try {
      const data = await estadisticasService.getResumenCategorias();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener estadísticas de categorías" });
    }
  }

  async pedidos(_req: Request, res: Response) {
    try {
      const data = await estadisticasService.getResumenPedidos();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener estadísticas de pedidos" });
    }
  }
}
