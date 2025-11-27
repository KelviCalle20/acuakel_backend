import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Usuario } from "../../usuarios/entities/user.entity";

@Entity("detalle_pedido")
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.detalles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pedido_id" })
  pedido: Pedido;

  @Column({ name: "producto_id" })
  productoId: number; // solo guardamos el id

  @Column()
  cantidad: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio_unitario: number;

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
}
