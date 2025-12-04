import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import { Usuario } from "../../usuarios/entities/user.entity";
import { RoleUser } from "../../usuarios/entities/role_user.entity";

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

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

  @OneToMany(() => RoleUser, roleUser => roleUser.rol)
  rolesUsuarios!: RoleUser[];
}
