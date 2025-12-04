import { Router } from "express";
import { RoleUserController } from "../controllers/role_user.controller";
import { authenticateJWT, checkRole } from "../../auth/middleware/auth.middleware";

const router = Router();
const controller = new RoleUserController();

// Todas requieren JWT y rol Administrador
router.use(authenticateJWT, checkRole("Administrador"));

// Obtener roles de un usuario
router.get("/:id", controller.getRolesByUser.bind(controller));

// Asignar rol
router.post("/:id", controller.assignRole.bind(controller));

// Remover rol
router.delete("/:id", controller.removeRole.bind(controller));

export default router;
