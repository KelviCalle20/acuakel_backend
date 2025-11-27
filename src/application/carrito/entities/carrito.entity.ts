import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/user.entity";
import { DetalleCarrito } from "./detalleCarrito.entity";

@Entity("carritos")
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column({ default: true })
  estado: boolean;

  @CreateDateColumn({ type: "timestamp", name: "fechacreacion" })
  fechaCreacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuariocreacion" })
  usuarioCreacion: Usuario;

  @UpdateDateColumn({ type: "timestamp", name: "fechaactualizacion" })
  fechaActualizacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuarioactualizacion" })
  usuarioActualizacion: Usuario;

  @OneToMany(() => DetalleCarrito, detalle => detalle.carrito)
  detalles: DetalleCarrito[];
}

