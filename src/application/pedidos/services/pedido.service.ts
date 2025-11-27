import { PedidoRepository } from "../repositories/pedido.repository";
import { Pedido } from "../entities/pedido.entity";
import { DetallePedido } from "../entities/detalle_pedido.entity";
import { EstadoPedido } from "../entities/estado_pedido.entity";
import { Usuario } from "../../usuarios/entities/user.entity";

export class PedidoService {
  private repo = new PedidoRepository();

  async getAllPedidos() {
    return this.repo.findAll();
  }

  async getPedidoById(id: number) {
    return this.repo.findById(id);
  }

  async createPedido(
    usuario: Usuario,
    total: number,
    estadoPedido?: EstadoPedido,
    detalles: Array<{ productoId: number; cantidad: number; precio_unitario: number }> = []
  ) {
    const pedido = new Pedido();
    pedido.usuario = usuario;
    pedido.total = total;
    pedido.estadoPedido = estadoPedido ?? undefined;
    pedido.estado = true;
    pedido.usuarioCreacion = usuario;
    pedido.usuarioActualizacion = usuario;

    const pedidoGuardado = await this.repo.createPedido(pedido);

    // Solo crear detalles si hay
    if (detalles.length > 0) {
      for (const det of detalles) {
        const detalle = new DetallePedido();
        detalle.pedido = pedidoGuardado;
        detalle.productoId = det.productoId; // asigna correctamente
        detalle.cantidad = det.cantidad;
        detalle.precio_unitario = det.precio_unitario;
        detalle.estado = true;
        detalle.usuarioCreacion = usuario;
        detalle.usuarioActualizacion = usuario;
        await this.repo.createDetalle(detalle);
      }
    }

    return this.repo.findById(pedidoGuardado.id);
  }

  async updatePedidoEstado(pedido: Pedido, estadoPedido: EstadoPedido, usuario: Usuario) {
    pedido.estadoPedido = estadoPedido;
    pedido.usuarioActualizacion = usuario;
    return this.repo.updatePedido(pedido);
  }

  async deletePedido(pedido: Pedido, usuario: Usuario) {
    pedido.estado = false;
    pedido.usuarioActualizacion = usuario;
    return this.repo.updatePedido(pedido);
  }

  async getAllEstados() {
    return this.repo.findAllEstados();
  }
}
