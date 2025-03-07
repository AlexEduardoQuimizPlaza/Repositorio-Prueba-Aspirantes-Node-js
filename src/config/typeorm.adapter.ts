import "reflect-metadata";
import { DataSource } from "typeorm";
import { Persona } from "../data/mongo/entities/persona.entity";
import { Usuario } from "../data/mongo/entities/user.entity";
import { Rol } from "../data/mongo/entities/rol.entity";
import { RolUsuario } from "../data/mongo/entities/rolUsuario.entity";
import { Sessions } from "../data/mongo/entities/sessions.entity";
import { RolOpciones } from "../data/mongo/entities/rolOpciones.entity";
import { RolRolOpciones } from "../data/mongo/entities/rolRolOpciones";
import {envs} from "./envs";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: envs.MONGO_URL,
    database: envs.MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true, // Cambia a false en producción
    logging: true,
    entities: [Persona, Usuario, Rol, RolUsuario, Sessions, RolOpciones, RolRolOpciones],
    migrations: [],
    subscribers: [],
});

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
    .then(() => console.log("Conexión a MongoDB establecida con TypeORM"))
    .catch((error) => console.log("Error conectando a MongoDB:", error));