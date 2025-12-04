import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
  private roleRepository = new RoleRepository();

  getAllRoles() {
    return this.roleRepository.findAll();
  }

  getRoleById(id: number) {
    return this.roleRepository.findById(id);
  }

  createRole(data: any) {
    return this.roleRepository.create(data);
  }

  updateRole(id: number, data: any) {
    return this.roleRepository.update(id, data);
  }

  deleteRole(id: number) {
    return this.roleRepository.delete(id);
  }
}
