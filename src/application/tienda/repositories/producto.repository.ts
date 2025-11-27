import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db";
import { Producto } from "../entities/producto.entity";

export class ProductoRepository {
  private repo: Repository<Producto>;

  constructor() {
    this.repo = AppDataSource.getRepository(Producto);
  }

  findAll() {
    return this.repo.find({
      relations: ["categoria"],
      order: { id: "ASC" },
    });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["categoria"] });
  }

  create(producto: Partial<Producto>) {
    return this.repo.create(producto);
  }

  save(producto: Producto) {
    return this.repo.save(producto);
  }

  update(id: number, producto: Partial<Producto>) {
    return this.repo.save({ id, ...producto });
  }

  changeStatus(id: number, estado: boolean) {
    return this.repo.save({ id, estado });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
