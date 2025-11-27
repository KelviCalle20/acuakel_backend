import { Categoria } from "../entities/categoria.entity";
import { CategoriaRepository } from "../repositories/categoria.repository";
import { Usuario } from "../../usuarios/entities/user.entity";

const INITIAL_ADMIN_ID = 1;

export class CategoriaService {
  private repo = new CategoriaRepository();

  async getAll(): Promise<Categoria[]> {
    return this.repo.findAll();
  }

  async create(categoria: Partial<Categoria>): Promise<Categoria> {
    // Crear instancia de Usuario para la relación
    const usuarioCreacion = new Usuario();
    usuarioCreacion.id = categoria.usuarioCreacion?.id ?? INITIAL_ADMIN_ID;

    const newCategoria = this.repo.create({
      ...categoria,
      estado: true,
      usuarioCreacion,
      usuarioActualizacion: null,
    });

    return this.repo.save(newCategoria);
  }

  async update(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    const usuarioActualizacion = new Usuario();
    usuarioActualizacion.id = categoria.usuarioActualizacion?.id ?? INITIAL_ADMIN_ID;

    return this.repo.update(id, {
      ...categoria,
      usuarioActualizacion,
      fechaActualizacion: new Date(),
    });
  }

  async changeStatus(id: number, estado: boolean): Promise<Categoria> {
    return this.repo.changeStatus(id, estado);
  }
}



