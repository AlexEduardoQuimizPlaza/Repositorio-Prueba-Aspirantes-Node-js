import { MongoDatabase } from "../mongo/mongo-database";
import { envs } from "../../config";
import { seedData } from "./data";
import { getMongoRepository } from "typeorm";
import { Usuario } from "../mongo/entities/user.entity";
import { Persona } from "../mongo/entities/persona.entity";
import { Rol } from "../mongo/entities/rol.entity";
import { RolUsuario } from "../mongo/entities/rolUsuario.entity";
import { Sessions } from "../mongo/entities/sessions.entity";
import { RolOpciones } from "../mongo/entities/rolOpciones.entity";
import { RolRolOpciones } from "../mongo/entities/rolRolOpciones";

(async () => {
    try {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });

        await main();

        await MongoDatabase.disconnect();
    } catch (error) {
        console.error("Error during seeding:", error);
    }
})();

const randomBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x);
};

async function main() {
    try {
        const userRepository = getMongoRepository(Usuario);
        const personaRepository = getMongoRepository(Persona);
        const rolRepository = getMongoRepository(Rol);
        const rolUsuarioRepository = getMongoRepository(RolUsuario);
        const sessionsRepository = getMongoRepository(Sessions);
        const rolOpcionesRepository = getMongoRepository(RolOpciones);
        const rolRolOpcionesRepository = getMongoRepository(RolRolOpciones);

        await userRepository.deleteMany({});
        await personaRepository.deleteMany({});
        await rolRepository.deleteMany({});
        await rolUsuarioRepository.deleteMany({});
        await sessionsRepository.deleteMany({});
        await rolOpcionesRepository.deleteMany({});
        await rolRolOpcionesRepository.deleteMany({});

        await personaRepository.insertMany(seedData.personas);
        await userRepository.insertMany(seedData.usuarios);
        await rolRepository.insertMany(seedData.roles);
        await rolUsuarioRepository.insertMany(seedData.rolUsuarios);
        await sessionsRepository.insertMany(seedData.sessions);
        await rolOpcionesRepository.insertMany(seedData.rolOpciones);
        await rolRolOpcionesRepository.insertMany(seedData.rolRolOpciones);

        console.log('SEEDED');
    } catch (error) {
        console.error("Error during main seeding function:", error);
    }
}