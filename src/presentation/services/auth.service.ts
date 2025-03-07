import { getMongoRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../../data/mongo/entities/user.entity";
import { Persona } from "../../data/mongo/entities/persona.entity";
import { ObjectId } from "mongodb";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

/**
 * Genera un JWT para el usuario autenticado.
 */
const generateToken = (user: Usuario): string => {
    return jwt.sign(
        { id: user.id.toHexString(), email: user.Mail, username: user.UserName, role: user.Status },
        SECRET_KEY,
        { expiresIn: "2h" }
    );
};

/**
 * Crea una nueva persona.
 */
const createPersona = async (personaData: { Nombres: string; Apellidos: string }): Promise<Persona> => {
    const personaRepository = getMongoRepository(Persona);
    const newPersona = personaRepository.create(personaData);
    return await personaRepository.save(newPersona);
};

/**
 * Registra un nuevo usuario.
 */
export const registerUser = async (userData: { Nombres: string; Apellidos: string; Mail: string; UserName: string; Password: string; Status: string }): Promise<Usuario> => {
    const personaRepository = getMongoRepository(Persona);
    const userRepository = getMongoRepository(Usuario);

    // Crear una nueva persona
    const persona = await createPersona({ Nombres: userData.Nombres, Apellidos: userData.Apellidos });

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(userData.Password, 10);

    // Crear nuevo usuario
    const newUser = userRepository.create({
        UserName: userData.UserName,
        Mail: userData.Mail,
        Password: hashedPassword,
        SessionActive: true,
        Status: userData.Status,
        personaId: persona.id.toHexString()
    });

    return await userRepository.save(newUser);
};

/**
 * Autenticación de usuario (Login).
 */
export const loginUser = async (email: string, password: string): Promise<{ token: string } | null> => {
    const userRepository = getMongoRepository(Usuario);
    const user = await userRepository.findOne({ where: { Mail: email } });
    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
        return null;
    }

    const token = generateToken(user);
    return { token };
};

/**
 * Obtiene todos los usuarios activos.
 */
export const getAllUsers = async (): Promise<Usuario[]> => {
    const userRepository = getMongoRepository(Usuario);
    return await userRepository.find({ where: { Status: "active" } });
};

/**
 * Obtiene un usuario por ID, solo si está activo.
 */
export const getUserById = async (id: string): Promise<Usuario | null> => {
    const userRepository = getMongoRepository(Usuario);
    return await userRepository.findOne({ where: { _id: new ObjectId(id), Status: "active" } });
};

/**
 * Eliminación lógica del usuario (marca como inactivo).
 */
export const deleteUser = async (id: string): Promise<boolean> => {
    const userRepository = getMongoRepository(Usuario);
    const result = await userRepository.updateOne({ _id: new ObjectId(id) }, { $set: { Status: "inactive" } });
    return result.modifiedCount !== 0;
};

export const updateUser = async (id: string, userData: Partial<Usuario>): Promise<Usuario | null> => {
    const userRepository = getMongoRepository(Usuario);
    await userRepository.updateOne({ _id: new ObjectId(id) }, { $set: userData });
    return await userRepository.findOne({ where: { _id: new ObjectId(id) } });
};