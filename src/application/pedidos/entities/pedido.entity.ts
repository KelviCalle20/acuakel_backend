import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/user.entity";
import { EstadoPedido } from "./estado_pedido.entity";
import { DetallePedido } from "./detalle_pedido.entity";

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => EstadoPedido, { nullable: true })
  @JoinColumn({ name: "estado_id" })
  estadoPedido?: EstadoPedido;

  @Column({ default: true })
  estado: boolean;

  @CreateDateColumn({ name: "fechacreacion" })
  fechaCreacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuariocreacion" })
  usuarioCreacion: Usuario;

  @UpdateDateColumn({ name: "fechaactualizacion" })
  fechaActualizacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuarioactualizacion" })
  usuarioActualizacion: Usuario;

  @OneToMany(() => DetallePedido, detalle => detalle.pedido, { cascade: true })
  detalles: DetallePedido[];
}

