// src/application/estadisticas/services/estadisticas.service.ts
import { EstadisticasRepository } from "../repositories/estadistica.repository";

export class EstadisticasService {
  private repo: EstadisticasRepository;

  constructor() {
    this.repo = new EstadisticasRepository();
  }

  async getResumenUsuarios() {
    return {
      total: await this.repo.contarUsuarios(),
      activos: await this.repo.contarUsuariosActivos(),
      inactivos: await this.repo.contarUsuariosInactivos(),
    };
  }

  async getResumenProductos() {
    return {
      total: await this.repo.contarProductos(),
      activos: await this.repo.contarProductosActivos(),
      inactivos: await this.repo.contarProductosInactivos(),
    };
  }

  async getResumenCategorias() {
    return {
      total: await this.repo.contarCategorias(),
    };
  }

  async getResumenPedidos() {
    const total = await this.repo.contarPedidos();
    const totalVentas = await this.repo.totalVentas();
    return {
      totalPedidos: total,
      totalVentas,
    };
  }
}
