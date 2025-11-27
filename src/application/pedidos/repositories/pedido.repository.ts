import { AppDataSource } from "../../../config/db";
import { Repository } from "typeorm";
import { Pedido } from "../entities/pedido.entity";
import { DetallePedido } from "../entities/detalle_pedido.entity";
import { EstadoPedido } from "../entities/estado_pedido.entity";

export class PedidoRepository {
  private repo: Repository<Pedido>;
  private detalleRepo: Repository<DetallePedido>;
  private estadoRepo: Repository<EstadoPedido>;

  constructor() {
    this.repo = AppDataSource.getRepository(Pedido);
    this.detalleRepo = AppDataSource.getRepository(DetallePedido);
    this.estadoRepo = AppDataSource.getRepository(EstadoPedido);
  }

  findAll() {
    return this.repo.find({ relations: ["usuario", "detalles", "estadoPedido"] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["usuario", "detalles", "estadoPedido"] });
  }

  createPedido(pedido: Pedido) {
    return this.repo.save(pedido);
  }

  createDetalle(detalle: DetallePedido) {
    return this.detalleRepo.save(detalle);
  }

  updatePedido(pedido: Pedido) {
    return this.repo.save(pedido);
  }

  findAllEstados() {
    return this.estadoRepo.find();
  }

  findEstadoById(id: number) {
    return this.estadoRepo.findOneBy({ id });
  }
}
