import { Router } from "express";
import * as AuthController from "../presentation/auth/controller";
import { authenticateToken } from "../presentation/middlewares/auth.middleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Rutas de autenticación y usuarios
    router.post("/auth/register", AuthController.registerUser);
    router.post("/auth/login", AuthController.loginUser);

    router.get("/auth/users", authenticateToken, AuthController.getAllUsers);
    router.get("/auth/users/:id", authenticateToken, AuthController.getUserById);
    router.put("/auth/users/:id", authenticateToken, AuthController.updateUser);
    router.delete("/auth/users/:id", authenticateToken, AuthController.deleteUser);

    return router;
  }
}