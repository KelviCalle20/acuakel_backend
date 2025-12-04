import { AppDataSource } from "../../../config/db";
import { RoleUser } from "../entities/role_user.entity";
import { Usuario } from "../entities/user.entity";
import { Role } from "../entities/role.entity";

export class RoleUserRepository {
    private repo = AppDataSource.getRepository(RoleUser);

    // Asignar un rol a un usuario, manejando usuarioCreacion/Actualizacion
    async assignRoleToUser(usuarioId: number, rolId: number, loggedUserId: number) {
        const existing = await this.repo.findOne({
            where: { usuario: { id: usuarioId }, rol: { id: rolId }, estado: true },
        });

        if (existing) {
            // Ya existe, actualizar usuarioActualizacion
            existing.usuarioActualizacion = { id: loggedUserId } as Usuario;
            existing.fechaActualizacion = new Date();
            return this.repo.save(existing);
        } else {
            // No existe, crear nuevo registro
            const ru = this.repo.create({
                usuario: { id: usuarioId } as Usuario,
                rol: { id: rolId } as Role,
                estado: true,
                usuarioCreacion: { id: loggedUserId } as Usuario,
            });
            return this.repo.save(ru);
        }
    }

    async removeRolesFromUser(usuarioId: number) {
        return this.repo.update(
            { usuario: { id: usuarioId }, estado: true },
            { estado: false }
        );
    }

    async removeRoleUser(usuarioId: number, rolId: number, loggedUserId?: number) {
        const existing = await this.repo.findOne({
            where: { usuario: { id: usuarioId }, rol: { id: rolId }, estado: true },
        });

        if (existing) {
            existing.estado = false;
            if (loggedUserId) {
                existing.usuarioActualizacion = { id: loggedUserId } as Usuario;
                existing.fechaActualizacion = new Date();
            }
            return this.repo.save(existing);
        }

        return { affected: 0 };
    }


    async findByUserId(usuarioId: number) {
        return this.repo.find({
            where: { usuario: { id: usuarioId }, estado: true },
            relations: ["rol"],
        });
    }
}

