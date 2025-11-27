import { DataSource } from "typeorm";
import { Carrito } from "../entities/carrito.entity";
import { DetalleCarrito } from "../entities/detalleCarrito.entity";

export const carritoRepository = (dataSource: DataSource) => dataSource.getRepository(Carrito);
export const detalleCarritoRepository = (dataSource: DataSource) => dataSource.getRepository(DetalleCarrito);
