// auth.service.ts
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt";
import { UserRepository } from "../../usuarios/repositories/user.repository";
import { Usuario } from "../../usuarios/entities/user.entity";
import { EmailService } from "./email.service";
import { ResetClaveRepository } from "../repositories/password_reset.repository";

export class AuthService {
  private userRepository = new UserRepository();
  private resetClaveRepository = new ResetClaveRepository();
  private emailService = new EmailService();

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

  // --- Nueva función ---
  async forgotPassword(correo: string) {
    const user = await this.userRepository.findByCorreo(correo);
    if (!user) throw new Error("Usuario no encontrado");

    // Generar código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Crear fecha de expiración (15 minutos desde ahora)
    const expiracion = new Date();
    expiracion.setMinutes(expiracion.getMinutes() + 15);

    const resetClave = this.resetClaveRepository.create({
      codigo,
      usuario: user,
      expiracion,
      usuarioCreacion: user, // opcional: quien generó el reset
    });

    await this.resetClaveRepository.save(resetClave);

    await this.emailService.enviarCodigo(user.correo, codigo);

    return { message: "Código enviado a tu correo" };
  }


  // --- Nueva función ---
  async resetPassword(correo: string, codigo: string, nuevaContrasena: string) {
    const reset = await this.resetClaveRepository.findByCodigo(codigo);
    if (!reset || reset.usuario.correo !== correo) throw new Error("Código inválido");

    reset.estado = false;
    await this.resetClaveRepository.deactivate(reset.id);

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    await this.userRepository.update(reset.usuario.id, { contrasena: hashedPassword });

    return { message: "Contraseña actualizada con éxito" };
  }
}
