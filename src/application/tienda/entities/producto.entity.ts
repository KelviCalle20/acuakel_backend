import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Categoria } from "./categoria.entity";
import { Usuario } from "../../usuarios/entities/user.entity";

@Entity({ name: "productos" })
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio!: number;

  @Column({ type: "int", default: 0 })
  stock!: number;

  @Column({ type: "text", nullable: true })
  imagen_url?: string;

  @ManyToOne(() => Categoria, { nullable: true })
  @JoinColumn({ name: "categoria_id" })
  categoria?: Categoria | null;

  @Column({ type: "boolean", default: true })
  estado!: boolean;

  @CreateDateColumn({ type: "timestamp", name: "fechacreacion" })
  fechaCreacion!: Date;

  @UpdateDateColumn({ type: "timestamp", name: "fechaactualizacion" })
  fechaActualizacion!: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "usuariocreacion" })
  usuarioCreacion?: Usuario | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "usuarioactualizacion" })
  usuarioActualizacion?: Usuario | null;
}
