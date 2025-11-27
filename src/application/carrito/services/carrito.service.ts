import { DataSource } from "typeorm";
import { Carrito } from "../entities/carrito.entity";
import { DetalleCarrito } from "../entities/detalleCarrito.entity";
import { Producto } from "../../tienda/entities/producto.entity";
import { Usuario } from "../../usuarios/entities/user.entity";

export class CarritoService {
  constructor(private dataSource: DataSource) { }

  private carritoRepo = this.dataSource.getRepository(Carrito);
  private detalleRepo = this.dataSource.getRepository(DetalleCarrito);
  private productoRepo = this.dataSource.getRepository(Producto);

  async obtenerTodosLosCarritos() {
    const carritos = await this.carritoRepo.find({
      where: { estado: true },
      relations: ["usuario", "detalles", "detalles.producto"]
    });

    return carritos.map(c => ({
      carrito_id: c.id,
      usuario_id: c.usuario.id,
      detalles: c.detalles.map(d => ({
        detalle_id: d.id,
        producto_id: d.producto.id,
        nombre: d.producto.nombre,
        precio: d.producto.precio,
        cantidad: d.cantidad,
        subtotal: d.producto.precio * d.cantidad
      }))
    }));
  }

  async agregarProducto(usuarioId: number, productoId: number, cantidad: number) {
    if (!usuarioId || !productoId || !cantidad) throw new Error("Faltan datos.");

    const producto = await this.productoRepo.findOne({ where: { id: productoId, estado: true } });
    if (!producto) throw new Error("Producto no encontrado o inactivo.");
    if (producto.stock < cantidad) throw new Error("Stock insuficiente.");

    let carrito = await this.carritoRepo.findOne({
      where: { usuario: { id: usuarioId }, estado: true },
      relations: ["detalles"]
    });

    if (!carrito) {
      carrito = this.carritoRepo.create({ usuario: { id: usuarioId } as Usuario, usuarioCreacion: { id: usuarioId } as Usuario, usuarioActualizacion: { id: usuarioId } as Usuario });
      await this.carritoRepo.save(carrito);
    }

    let detalle = await this.detalleRepo.findOne({ where: { carrito: { id: carrito.id }, producto: { id: productoId } } });

    if (detalle) {
      const nuevaCantidad = detalle.cantidad + cantidad;
      if (nuevaCantidad > producto.stock) throw new Error("No hay suficiente stock disponible.");
      detalle.cantidad = nuevaCantidad;
      detalle.usuarioActualizacion = { id: usuarioId } as Usuario;
      await this.detalleRepo.save(detalle);
    } else {
      detalle = this.detalleRepo.create({
        carrito,
        producto,
        cantidad,
        usuarioCreacion: { id: usuarioId } as Usuario,
        usuarioActualizacion: { id: usuarioId } as Usuario
      });
      await this.detalleRepo.save(detalle);
    }

    producto.stock -= cantidad;
    await this.productoRepo.save(producto);

    return detalle;
  }

  async obtenerCarrito(usuarioId: number) {
    const carrito = await this.carritoRepo.findOne({
      where: { usuario: { id: usuarioId }, estado: true },
      relations: ["detalles", "detalles.producto"]
    });

    if (!carrito) return [];

    return carrito.detalles.map(d => ({
      detalle_id: d.id,
      producto_id: d.producto.id,
      nombre: d.producto.nombre,
      precio: d.producto.precio,
      imagen_url: d.producto.imagen_url,
      cantidad: d.cantidad,
      subtotal: d.producto.precio * d.cantidad
    }));
  }

  async eliminarProducto(detalleId: number) {
    const detalle = await this.detalleRepo.findOne({ where: { id: detalleId }, relations: ["producto"] });
    if (!detalle) throw new Error("Detalle no encontrado.");

    detalle.producto.stock += detalle.cantidad;
    await this.productoRepo.save(detalle.producto);

    await this.detalleRepo.remove(detalle);
    return true;
  }

  async vaciarCarrito(usuarioId: number) {
    const carrito = await this.carritoRepo.findOne({ where: { usuario: { id: usuarioId }, estado: true }, relations: ["detalles", "detalles.producto"] });
    if (!carrito) return false;

    for (const detalle of carrito.detalles) {
      detalle.producto.stock += detalle.cantidad;
      await this.productoRepo.save(detalle.producto);
    }

    await this.detalleRepo.remove(carrito.detalles);
    return true;
  }
}
