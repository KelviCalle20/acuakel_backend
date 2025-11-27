import { Producto } from "../entities/producto.entity";
import { ProductoRepository } from "../repositories/producto.repository";
import { Usuario } from "../../usuarios/entities/user.entity";

const INITIAL_ADMIN_ID = 1;

export class ProductoService {
  private repo = new ProductoRepository();

  async getAll(): Promise<Producto[]> {
    return this.repo.findAll();
  }

  async create(producto: Partial<Producto>): Promise<Producto> {
    const usuarioCreacion = new Usuario();
    usuarioCreacion.id = producto.usuarioCreacion?.id ?? INITIAL_ADMIN_ID;

    const newProducto = this.repo.create({
      ...producto,
      estado: true,
      usuarioCreacion,
      usuarioActualizacion: null,
    });

    return this.repo.save(newProducto);
  }

  async update(id: number, producto: Partial<Producto>): Promise<Producto> {
    const usuarioActualizacion = new Usuario();
    usuarioActualizacion.id = producto.usuarioActualizacion?.id ?? INITIAL_ADMIN_ID;

    return this.repo.update(id, {
      ...producto,
      usuarioActualizacion,
      fechaActualizacion: new Date(),
    });
  }

  async changeStatus(id: number, estado: boolean): Promise<Producto> {
    return this.repo.changeStatus(id, estado);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
