import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Usuario } from "./user.entity";
import { Role } from "../entities/role.entity";

@Entity({ name: "roles_usuarios" })
export class RoleUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, usuario => usuario.roles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @ManyToOne(() => Role, role => role.rolesUsuarios, { onDelete: "CASCADE" })
  @JoinColumn({ name: "rol_id" })
  rol!: Role;

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
