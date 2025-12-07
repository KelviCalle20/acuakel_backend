import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "../../usuarios/entities/user.entity";

@Entity({ name: "reset_claves" })
export class ResetClave {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @Column({ length: 10 })
  codigo!: string;

  @Column({ type: "timestamp" })
  expiracion!: Date;

  @Column({ default: false })
  usado!: boolean;

  // Campos de auditoría
  @Column({ default: true })
  estado!: boolean;

  @CreateDateColumn({ type: "timestamp", name: "fechacreacion" })
  fechaCreacion!: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "usuariocreacion" })
  usuarioCreacion?: Usuario | null;

  @UpdateDateColumn({ type: "timestamp", name: "fechaactualizacion" })
  fechaActualizacion!: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "usuarioactualizacion" })
  usuarioActualizacion?: Usuario | null;
}
