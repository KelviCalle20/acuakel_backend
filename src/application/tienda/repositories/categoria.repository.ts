import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db";
import { Categoria } from "../entities/categoria.entity";

export class CategoriaRepository {
  private repo: Repository<Categoria>;

  constructor() {
    this.repo = AppDataSource.getRepository(Categoria);
  }

  findAll() {
    return this.repo.find({ where: { estado: true }, order: { nombre: "ASC" } });
  }

  create(categoria: Partial<Categoria>) {
    return this.repo.create(categoria);
  }

  save(categoria: Categoria) {
    return this.repo.save(categoria);
  }

  update(id: number, categoria: Partial<Categoria>) {
    return this.repo.save({ id, ...categoria });
  }

  changeStatus(id: number, estado: boolean) {
    return this.repo.save({ id, estado });
  }
}


