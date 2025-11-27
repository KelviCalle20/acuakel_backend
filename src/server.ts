import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./application/usuarios/routes/user.routes";
import productRoutes from "./application/tienda/routes/producto.routes";
import categoryRoutes from "./application/tienda/routes/categoria.routes";
import cartRoutes from "./application/carrito/routes/carrito.routes";
import pedidoRoutes from "./application/pedidos/routes/pedido.routes";
import { AppDataSource } from "./config/db"; // importa tu DataSource

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Función para iniciar servidor solo después de conectar a DB
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a PostgreSQL con TypeORM");

    // Rutas
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/carrito", cartRoutes);
    app.use("/api/pedidos", pedidoRoutes);

    // Servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con TypeORM:", err);
  });
