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



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const mediaPath = process.env.MEDIA_PATH;

if (!mediaPath) {
  throw new Error("MEDIA_PATH no está definido en el archivo .env");
}
// Middlewares
app.use(cors());
app.use(express.json());

app.use("/media", express.static(path.resolve(mediaPath)));

app.get("/api/media", (req, res) => {
  res.json({
    video: `http://localhost:${PORT}/media/bettas.mp4`,
    audio: `http://localhost:${PORT}/media/AcuaKel.mp3`,
  });
});


// Función para iniciar servidor solo después de conectar a DB
AppDataSource.initialize()
  .then(() => {
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
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con TypeORM:", err);
  });
