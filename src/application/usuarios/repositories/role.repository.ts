import { AppDataSource } from "../../../config/db";
import { Role } from "../entities/role.entity";

export class RoleRepository {
  private repo = AppDataSource.getRepository(Role);

  findAll() {
    return this.repo.find({
      where: { estado: true },
      order: { id: "ASC" },
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id, estado: true },
    });
  }

  create(data: Partial<Role>) {
    const role = this.repo.create(data);
    return this.repo.save(role);
  }

  update(id: number, data: Partial<Role>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.update(id, { estado: false });
  }
}
