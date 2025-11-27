import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Carrito } from "./carrito.entity";
import { Producto } from "../../tienda/entities/producto.entity";
import { Usuario } from "../../usuarios/entities/user.entity";

@Entity("detalle_carrito")
@Unique(["carrito", "producto"])
export class DetalleCarrito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrito, carrito => carrito.detalles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "carrito_id" })
  carrito: Carrito;

  @ManyToOne(() => Producto, { onDelete: "CASCADE" })
  @JoinColumn({ name: "producto_id" })
  producto: Producto;

  @Column({ default: 1 })
  cantidad: number;

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
}
