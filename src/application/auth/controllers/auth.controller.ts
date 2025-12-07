// auth.controller.ts
import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const router = Router();
const authService = new AuthService();

// Ruta login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { correo, contrasena } = req.body;
    const result = await authService.login(correo, contrasena);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// Ruta register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ message: "Usuario registrado", user: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Olvidé contraseña
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { correo } = req.body;
    const result = await authService.forgotPassword(correo);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Resetear contraseña
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { correo, codigo, nuevaContrasena } = req.body;
    const result = await authService.resetPassword(correo, codigo, nuevaContrasena);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

