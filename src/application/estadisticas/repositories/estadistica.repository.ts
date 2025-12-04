// src/application/estadisticas/repositories/estadisticas.repository.ts
import { AppDataSource } from "../../../config/db";
import { Repository } from "typeorm";
import { Usuario } from "../../usuarios/entities/user.entity";
import { Producto } from "../../tienda/entities/producto.entity";
import { Categoria } from "../../tienda/entities/categoria.entity";
import { Pedido } from "../../pedidos/entities/pedido.entity";

export class EstadisticasRepository {
  private usuarioRepo: Repository<Usuario>;
  private productoRepo: Repository<Producto>;
  private categoriaRepo: Repository<Categoria>;
  private pedidoRepo: Repository<Pedido>;

  constructor() {
    this.usuarioRepo = AppDataSource.getRepository(Usuario);
    this.productoRepo = AppDataSource.getRepository(Producto);
    this.categoriaRepo = AppDataSource.getRepository(Categoria);
    this.pedidoRepo = AppDataSource.getRepository(Pedido);
  }

  // ===== Usuarios =====
  async contarUsuarios() {
    return this.usuarioRepo.count();
  }

  async contarUsuariosActivos() {
    return this.usuarioRepo.count({ where: { estado: true } });
  }

  async contarUsuariosInactivos() {
    return this.usuarioRepo.count({ where: { estado: false } });
  }

  // ===== Productos =====
  async contarProductos() {
    return this.productoRepo.count();
  }

  async contarProductosActivos() {
    return this.productoRepo.count({ where: { estado: true } });
  }

  async contarProductosInactivos() {
    return this.productoRepo.count({ where: { estado: false } });
  }

  // ===== Categorías =====
  async contarCategorias() {
    return this.categoriaRepo.count();
  }

  // ===== Pedidos =====
  async contarPedidos() {
    return this.pedidoRepo.count();
  }

  async contarPedidosPorEstado(estadoId: number) {
    return this.pedidoRepo.count({ where: { estadoPedido: { id: estadoId } } });
  }

  async totalVentas() {
    const result = await this.pedidoRepo
      .createQueryBuilder("pedido")
      .select("SUM(pedido.total)", "totalVentas")
      .where("pedido.estado = :estado", { estado: true })
      .getRawOne();
    return Number(result.totalVentas || 0);
  }
}
