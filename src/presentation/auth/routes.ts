import { Router } from "express";
import { check } from "express-validator";
import * as AuthController from "../services/auth.controller";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post(
    "/register",
    [
        check("Nombres", "El nombre es obligatorio").not().isEmpty(),
        check("Apellidos", "El apellido es obligatorio").not().isEmpty(),
        check("Mail", "El correo electrónico es obligatorio").isEmail(),
        check("UserName", "El nombre de usuario es obligatorio").not().isEmpty(),
        check("Password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
        validateFields,
    ],
    AuthController.registerUser
);

router.post(
    "/login",
    [
        check("email", "El correo electrónico es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        validateFields,
    ],
    AuthController.loginUser
);

export default router;