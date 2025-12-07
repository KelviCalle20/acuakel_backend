import bcrypt from "bcrypt";
import { AppDataSource } from "./db";
import { Usuario } from "../application/usuarios/entities/user.entity";
import { Role } from "../application/usuarios/entities/role.entity";
import { RoleUser } from "../application/usuarios/entities/role_user.entity";
import { EmailService } from "../application/auth/services/email.service";

export async function initAdmin() {
  const userRepo = AppDataSource.getRepository(Usuario);
  const roleRepo = AppDataSource.getRepository(Role);
  const roleUserRepo = AppDataSource.getRepository(RoleUser);
  const emailService = new EmailService();

  const adminEmail = process.env.ADMIN_EMAIL!;

  // CREAR ROL ADMIN SI NO EXISTE
  let adminRole = await roleRepo.findOne({ where: { nombre: "Administrador" } });

  if (!adminRole) {
    adminRole = roleRepo.create({
      nombre: "Administrador",
      descripcion: "Acceso total al sistema",
      estado: true
    });

    adminRole = await roleRepo.save(adminRole);
    console.log("Rol Administrador creado");
  }

  // VERIFICAR ADMIN POR CORREO
  let adminUser = await userRepo.findOne({ where: { correo: adminEmail } });

  if (!adminUser) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    // CREAR USUARIO ADMIN
    adminUser = userRepo.create({
      nombre: process.env.ADMIN_NAME!,
      apellido_paterno: process.env.ADMIN_APELLIDO_PATERNO!,
      apellido_materno: process.env.ADMIN_APELLIDO_MATERNO!,
      correo: adminEmail,
      contrasena: hashedPassword,
      estado: true,
    });

    adminUser = await userRepo.save(adminUser);

    // SETEAR USUARIOS DE AUDITORÍA
    await userRepo.update(adminUser.id, {
      usuarioCreacion: { id: adminUser.id } as Usuario,
      usuarioActualizacion: { id: adminUser.id } as Usuario,
    });

    // ASIGNAR ROL ADMIN
    const roleUser = roleUserRepo.create({
      usuario: adminUser,
      rol: adminRole,
      usuarioCreacion: adminUser,
      usuarioActualizacion: adminUser,
    });

    await roleUserRepo.save(roleUser);

    console.log("Administrador creado correctamente");

    // ENVIAR CORREO
    await emailService.sendMail(
      adminEmail,
      "Backend iniciado",
      `
        <h2>Servidor iniciado con éxito</h2>
        <p>Se creó el usuario administrador automáticamente.</p>
        <p><b>Correo:</b> ${adminEmail}</p>
        <p><b>Contraseña:</b> ${process.env.ADMIN_PASSWORD}</p>
      `
    );
  } else {
    console.log("El administrador ya existe");
  }
}
