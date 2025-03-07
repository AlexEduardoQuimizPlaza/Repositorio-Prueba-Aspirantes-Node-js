import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

/**
 * Endpoint para registrar un usuario.
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = await AuthService.registerUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error: error.message });
    }
};

/**
 * Endpoint para autenticación (Login).
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.loginUser(email, password);

        if (!result) return res.status(401).json({ message: "Credenciales inválidas" });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error en el login", error: error.message });
    }
};

/**
 * Obtiene todos los usuarios activos.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await AuthService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};

/**
 * Elimina un usuario (eliminación lógica).
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await AuthService.deleteUser(id);

        if (!success) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario eliminado correctamente (lógico)" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
};

/**
 * Obtiene un usuario por ID, solo si está activo.
 */
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await AuthService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario", error: error.message });
    }
};

/**
 * Endpoint para actualizar un usuario.
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await AuthService.updateUser(req.params.id, req.body);
        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
    }
};