import { RoleUserRepository } from "../repositories/role_user.repository";

export class RoleUserService {
    private repo = new RoleUserRepository();

    getRolesByUser(usuarioId: number) {
        return this.repo.findByUserId(usuarioId);
    }

    assignRole(usuarioId: number, rolId: number, loggedUserId: number) {
        return this.repo.assignRoleToUser(usuarioId, rolId, loggedUserId);
    }

    removeRoles(usuarioId: number) {
        return this.repo.removeRolesFromUser(usuarioId);
    }

    removeRole(usuarioId: number, rolId: number, loggedUserId?: number) {
        return this.repo.removeRoleUser(usuarioId, rolId, loggedUserId);
    }

}

