// UserRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db";
import { Usuario } from "../entities/user.entity";

export class UserRepository {
  private repo: Repository<Usuario>;

  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }

  findById(id: number): Promise<Usuario | null> {
    return this.repo.findOne({
      where: { id, estado: true },
      relations: ["roles", "roles.rol"], // relaciones si usas roles
    });
  }

  findAll() {
    return this.repo.find({
      order: { id: "ASC" },
      relations: [
        "usuarioCreacion",
        "usuarioActualizacion",
        "roles",
        "roles.rol",
      ],
    });
  }


  findByCorreo(correo: string) {
    return this.repo.findOne({
      where: { correo },
      relations: ["roles", "roles.rol", "usuarioCreacion", "usuarioActualizacion"],
    });
  }


  create(user: Partial<Usuario>) {
    return this.repo.create(user);
  }

  save(user: Usuario) {
    return this.repo.save(user);
  }

  update(id: number, user: Partial<Usuario>) {
    return this.repo.save({ id, ...user });
  }

  changeStatus(id: number, estado: boolean, usuarioActualizacion: Usuario) {
    return this.repo.save({ id, estado, usuarioActualizacion });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}