import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware para validar los campos del request.
 */
export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};