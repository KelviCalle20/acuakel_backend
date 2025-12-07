import { CategoriaDestacadoRepository } from "../repositories/categoria_destacados.repository";
import { CategoriaDestacado } from "../entities/categoria_destacados.entity";

export class CategoriaDestacadoService {
  private repo = new CategoriaDestacadoRepository();

  async getAll() {
    return this.repo.findAll();
  }

  async getByCategoria(categoriaId: number) {
    return this.repo.findByCategoria(categoriaId);
  }

  async create(destacado: Partial<CategoriaDestacado>) {
    // Validar máximo 4 productos por tipo
    const count = await this.repo.countByCategoriaTipo(destacado.categoria!.id, destacado.tipo as "mejor" | "especial");
    if (count >= 4) {
      throw new Error(`No se pueden agregar más de 4 productos del tipo ${destacado.tipo}`);
    }

    return this.repo.save(destacado);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
