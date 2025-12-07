import bcrypt from "bcrypt";
import { Usuario } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt";
import { AppDataSource } from "../../../config/db";
import { Role } from "../entities/role.entity";
import { RoleUser } from "../entities/role_user.entity";
import { RegisterDto } from "../../auth/dtos/register.dto";

export class UserService {
  private repo = new UserRepository();

  async getAllUsers(): Promise<Usuario[]> {
    return this.repo.findAll();
  }

  // ================= REGISTRO =================
  async register(dto: RegisterDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(dto.contrasena, 10);

    return await AppDataSource.manager.transaction(async (manager) => {
      const userRepo = manager.getRepository(Usuario);
      const roleRepo = manager.getRepository(Role);
      const roleUserRepo = manager.getRepository(RoleUser);

      // Crear usuario
      const newUser = userRepo.create({
        nombre: dto.nombre,
        apellido_paterno: dto.apellido_paterno,
        apellido_materno: dto.apellido_materno,
        correo: dto.correo,
        contrasena: hashedPassword,
        estado: true,
        usuarioCreacion: dto.usuarioCreacion ? ({ id: dto.usuarioCreacion } as Usuario) : null,
        usuarioActualizacion: null,
      });

      const savedUser = await userRepo.save(newUser);

      // Determinar roles a asignar
      let rolesAAsignar = dto.roles || [];
      if (rolesAAsignar.length === 0) {
        const clienteRol = await roleRepo.findOneBy({ nombre: "Cliente" });
        if (clienteRol) rolesAAsignar.push(clienteRol.id);
      }

      // Crear registros en roles_usuarios
      for (const rolId of rolesAAsignar) {
        const rol = await roleRepo.findOneBy({ id: rolId });
        if (!rol) continue;

        const roleUser = roleUserRepo.create({
          usuario: savedUser,
          rol,
          usuarioCreacion: dto.usuarioCreacion ? ({ id: dto.usuarioCreacion } as Usuario) : savedUser,
        });

        await roleUserRepo.save(roleUser);
      }

      // Recargar usuario con relaciones
      const usuarioConRoles = await userRepo.findOne({
        where: { id: savedUser.id },
        relations: ["roles", "roles.rol", "usuarioCreacion", "usuarioActualizacion"],
      });

      // Asignar rol principal como string
      if (usuarioConRoles && usuarioConRoles.roles.length > 0) {
        usuarioConRoles.rol = usuarioConRoles.roles[0].rol.nombre;
      } else {
        usuarioConRoles!.rol = "";
      }

      return usuarioConRoles as Usuario;
    });
  }

  // ================= LOGIN =================
  async login(correo: string, contrasena: string) {
    const user = await this.repo.findByCorreo(correo);
    if (!user) throw new Error("Usuario no encontrado");

    const isValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isValid) throw new Error("Contraseña incorrecta");

    const roles = user.roles?.map(r => r.rol.nombre) || [];

    const token = jwt.sign(
      { id: user.id, correo: user.correo, roles },
      jwtConfig.secret,
      { expiresIn: "8h" }
    );

    return {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      roles,
      token,
    };
  }

  // ================= ACTUALIZAR =================
  async update(id: number, user: Partial<Usuario>) {
    return this.repo.update(id, {
      ...user,
      usuarioActualizacion: user.usuarioActualizacion ?? { id: 1 } as Usuario,
      fechaActualizacion: new Date(),
    });
  }

  // ================= CAMBIO DE ESTADO =================
  async changeStatus(id: number, estado: boolean, usuarioActualizacion: Usuario) {
    return this.repo.changeStatus(id, estado, usuarioActualizacion);
  }

  // ================= ELIMINAR =================
  async delete(id: number) {
    return this.repo.delete(id);
  }
}
