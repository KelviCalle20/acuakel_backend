import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/user.entity";

@Entity("estados_pedido")
export class EstadoPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, unique: true })
  nombre_estado: string;

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
