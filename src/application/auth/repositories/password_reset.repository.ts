import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db";
import { ResetClave } from "../entities/reset_claves.entity";

export class ResetClaveRepository {
  private repo: Repository<ResetClave>;

  constructor() {
    this.repo = AppDataSource.getRepository(ResetClave);
  }

  create(resetClave: Partial<ResetClave>) {
    return this.repo.create(resetClave);
  }

  save(resetClave: ResetClave) {
    return this.repo.save(resetClave);
  }

  findByCodigo(codigo: string) {
    return this.repo.findOne({
      where: { codigo, estado: true },
      relations: ["usuario"],
    });
  }

  deactivate(id: number) {
    return this.repo.update(id, { estado: false });
  }
}
