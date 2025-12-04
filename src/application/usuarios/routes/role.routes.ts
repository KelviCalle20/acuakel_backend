import { Router } from "express";
import { getRoles, getRoleById } from "../controllers/role.controller";
import { authenticateJWT, checkRole } from "../../auth/middleware/auth.middleware";

const router = Router();

/**
 * GET /api/roles
 * Protegido por JWT
 */
router.get(
  "/",
  authenticateJWT,
  checkRole("Administrador"), // ✅ solo admins
  getRoles
);

/**
 * GET /api/roles/:id
 */
router.get(
  "/:id",
  authenticateJWT,
  checkRole("Administrador"),
  getRoleById
);

export default router;

