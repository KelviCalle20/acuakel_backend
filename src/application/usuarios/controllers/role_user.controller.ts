import { Request, Response } from "express";
import { RoleUserService } from "../services/role_user.service";

const roleUserService = new RoleUserService();

export class RoleUserController {
    // Obtener roles de un usuario
    async getRolesByUser(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.id);
            const roles = await roleUserService.getRolesByUser(usuarioId);
            res.json(roles);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error al obtener roles del usuario" });
        }
    }

    // Asignar rol a usuario
    async assignRole(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.id);
            const { rolId, loggedUserId } = req.body;
            const result = await roleUserService.assignRole(usuarioId, rolId, loggedUserId);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error al asignar rol al usuario" });
        }
    }


    // Remover un rol de usuario
    async removeRole(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.id);
            const { rolId, loggedUserId } = req.body; // ✅ recibe quién quita
            const result = await roleUserService.removeRole(usuarioId, rolId, loggedUserId);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error al quitar rol del usuario" });
        }
    }

}
