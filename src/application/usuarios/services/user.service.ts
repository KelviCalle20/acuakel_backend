// UserService.ts
import bcrypt from "bcrypt";
import { Usuario } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt"; // importa tu secret
import { AppDataSource } from "../../../config/db";
import { Role } from "../entities/role.entity";
import { RoleUser } from "../entities/role_user.entity";

export class UserService {
  private repo = new UserRepository();

  async getAllUsers(): Promise<Usuario[]> {
    return this.repo.findAll();
  }

  async register(user: Partial<Usuario>): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(user.contrasena!, 10);

    // 1️⃣ Crear usuario
    const newUser = this.repo.create({
      nombre: user.nombre,
      apellido_paterno: user.apellido_paterno,
      apellido_materno: user.apellido_materno,
      correo: user.correo,
      contrasena: hashedPassword,
      estado: true,
      usuarioCreacion: null, // Se asignará después
      usuarioActualizacion: null,
    });

    // 2️⃣ Guardar usuario para generar ID
    const savedUser = await this.repo.save(newUser);

    // 3️⃣ Actualizar usuarioCreacion = su propio id
    savedUser.usuarioCreacion = savedUser as any; // asignamos la relación con sí mismo
    await this.repo.save(savedUser);

    // 4️⃣ Asignar rol Cliente automáticamente
    const rolRepo = AppDataSource.getRepository(Role);
    const roleUserRepo = AppDataSource.getRepository(RoleUser);

    const clienteRol = await rolRepo.findOneBy({ nombre: "Cliente" });
    if (clienteRol) {
      const userRole = new RoleUser();
      userRole.usuario = savedUser;
      userRole.rol = clienteRol;
      userRole.usuarioCreacion = savedUser as any;
      await roleUserRepo.save(userRole);

      // 5️⃣ Actualizar rol principal en usuario
      savedUser.rol = clienteRol.nombre;
      await this.repo.save(savedUser);
    }

    return savedUser;
  }

  async login(correo: string, contrasena: string) {
    const user = await this.repo.findByCorreo(correo);
    if (!user) throw new Error("Usuario no encontrado");

    const isValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isValid) throw new Error("Contraseña incorrecta");

    // Extraer nombres de roles
    const roles = user.roles?.map(r => r.rol.nombre) || [];

    // Generar JWT
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

  async update(id: number, user: Partial<Usuario>) {
    return this.repo.update(id, {
      ...user,
      usuarioActualizacion: user.usuarioActualizacion ?? { id: 1 } as Usuario,
      fechaActualizacion: new Date(),
    });
  }

  async changeStatus(id: number, estado: boolean, usuarioActualizacion: Usuario) {
    return this.repo.changeStatus(id, estado, usuarioActualizacion);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
