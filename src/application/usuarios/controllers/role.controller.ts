import { Request, Response } from "express";
import { RoleService } from "../services/role.service";

const roleService = new RoleService();

// ✅ GET /api/roles
export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener roles:", error);
    res.status(500).json({ message: "Error al obtener roles" });
  }
};

// ✅ GET /api/roles/:id
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const role = await roleService.getRoleById(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener rol" });
  }
};
