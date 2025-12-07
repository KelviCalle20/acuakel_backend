import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./application/usuarios/routes/user.routes";
import roleRoutes from "./application/usuarios/routes/role.routes";
import roleUserRoutes from "./application/usuarios/routes/role_user.routes";
import productRoutes from "./application/tienda/routes/producto.routes";
import categoryRoutes from "./application/tienda/routes/categoria.routes";
import cartRoutes from "./application/carrito/routes/carrito.routes";
import pedidoRoutes from "./application/pedidos/routes/pedido.routes";
import estadisticasRoutes from "./application/estadisticas/routes/estadistica.routes";
import { AppDataSource } from "./config/db";
import authRoutes from './application/auth/routes/auth.routes';
import { Usuario } from "./application/usuarios/entities/user.entity";
import { Role } from "./application/usuarios/entities/role.entity";
import { RoleUser } from "./application/usuarios/entities/role_user.entity";
import { EmailService } from "./application/auth/services/email.service";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const mediaPath = process.env.MEDIA_PATH;

if (!mediaPath) {
  throw new Error("MEDIA_PATH no está definido en el archivo .env");
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.resolve(mediaPath)));

app.get("/api/media", (req, res) => {
  const protocol = req.protocol;
  const host = req.get("host");
  res.json({
    video: `${protocol}://${host}/media/bettas.mp4`,
    audio: `${protocol}://${host}/media/AcuaKel.mp3`,
  });
});

// ======================
// FUNCIONES DE INICIO
// ======================

async function createAdminDefault() {
  const emailService = new EmailService();

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminNombre = process.env.ADMIN_NOMBRE!;
  const adminApellidoP = process.env.ADMIN_APELLIDO_PATERNO!;
  const adminApellidoM = process.env.ADMIN_APELLIDO_MATERNO!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const userRepo = AppDataSource.getRepository(Usuario);
  const roleRepo = AppDataSource.getRepository(Role);
  const roleUserRepo = AppDataSource.getRepository(RoleUser);

  // Verificar si ya existe un admin con ese correo
  let existingAdmin = await userRepo.findOne({ where: { correo: adminEmail } });
  if (existingAdmin) return; // Ya existe

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const newAdmin = userRepo.create({
    nombre: adminNombre,
    apellido_paterno: adminApellidoP,
    apellido_materno: adminApellidoM,
    correo: adminEmail,
    contrasena: hashedPassword,
    estado: true,
    usuarioCreacion: null,
    usuarioActualizacion: null
  });
  const savedAdmin = await userRepo.save(newAdmin);

  // Crear rol administrador si no existe
  let adminRole = await roleRepo.findOne({ where: { nombre: "Administrador" } });
  if (!adminRole) {
    adminRole = roleRepo.create({
      nombre: "Administrador",
      descripcion: "Rol con acceso completo a todas las funciones del sistema",
      estado: true,
      usuarioCreacion: savedAdmin, // PASAR ENTIDAD COMPLETA
    });
    adminRole = await roleRepo.save(adminRole);
  }

  // Asignar rol al admin
  const roleUser = roleUserRepo.create({
    usuario: savedAdmin,
    rol: adminRole,
    estado: true,
    usuarioCreacion: savedAdmin, // PASAR ENTIDAD COMPLETA
  });
  await roleUserRepo.save(roleUser);

  // Enviar correo de notificación
  try {
    await emailService.enviarCodigos(
      adminEmail,
      `Se creó el administrador Principal.\nCorreo: ${adminEmail}\nContraseña: ${adminPassword}`
    );
    console.log("Correo de administrador enviado");
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}


AppDataSource.initialize()
  .then(async () => {
    // Crear admin por defecto
    await createAdminDefault();

    // Rutas
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/carrito", cartRoutes);
    app.use("/api/pedidos", pedidoRoutes);
    app.use("/api/estadisticas", estadisticasRoutes);
    app.use('/api/auth', authRoutes);
    app.use("/api/roles", roleRoutes);
    app.use("/api/role_user", roleUserRoutes);

    // Servidor
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con TypeORM:", err);
  });
