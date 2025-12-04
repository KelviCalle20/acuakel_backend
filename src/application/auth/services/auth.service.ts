// auth.service.ts
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt";
import { UserRepository } from "../../usuarios/repositories/user.repository";
import { Usuario } from "../../usuarios/entities/user.entity";

export class AuthService {
  private userRepository = new UserRepository();

  // Login: verifica credenciales y genera JWT con roles
  async login(correo: string, contrasena: string) {
    // Buscar usuario por correo
    const user = await this.userRepository.findByCorreo(correo);
    if (!user) throw new Error("Usuario no encontrado");

    // Verificar contraseña
    const passwordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordValid) throw new Error("Contraseña incorrecta");

    // Obtener roles del usuario
    const roles = user.roles?.map(r => r.rol.nombre) || [];

    // Generar JWT
    const payload = { id: user.id, correo: user.correo, roles };
    
    // Opciones para jwt.sign
    const options: SignOptions = { expiresIn: "1h" }; // literal válido para TypeScript

    const token = jwt.sign(payload as Record<string, any>, jwtConfig.secret, options);

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        roles,
      },
    };
  }

  // Registrar usuario
  async register(userData: Partial<Usuario>) {
    const hashedPassword = await bcrypt.hash(userData.contrasena!, 10);

    const newUser = this.userRepository.create({
      nombre: userData.nombre,
      apellido_paterno: userData.apellido_paterno,
      apellido_materno: userData.apellido_materno,
      correo: userData.correo,
      contrasena: hashedPassword,
      estado: true,
      usuarioCreacion: userData.usuarioCreacion,
    });

    return this.userRepository.save(newUser);
  }
}
