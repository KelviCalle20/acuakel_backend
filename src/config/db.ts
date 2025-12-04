import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Usuario } from "../application/usuarios/entities/user.entity";
import { Categoria } from "../application/tienda/entities/categoria.entity";
import { Producto } from "../application/tienda/entities/producto.entity";
import { Carrito } from "../application/carrito/entities/carrito.entity";
import { DetalleCarrito } from "../application/carrito/entities/detalleCarrito.entity";
import { Pedido } from "../application/pedidos/entities/pedido.entity";
import { DetallePedido } from "../application/pedidos/entities/detalle_pedido.entity";
import { EstadoPedido } from "../application/pedidos/entities/estado_pedido.entity";
import { Role } from "../application/usuarios/entities/role.entity";
import { RoleUser } from "../application/usuarios/entities/role_user.entity";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Usuario, Role, RoleUser, Categoria, Producto, Carrito, DetalleCarrito, Pedido, DetallePedido, EstadoPedido,], 
  synchronize: false, 
  logging: false,
});
// Inicialización
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a PostgreSQL con TypeORM");
  })
  .catch((err) => {
    console.error("Error al conectar con TypeORM:", err);
  });