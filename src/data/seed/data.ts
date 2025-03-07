import { bcryptAdapter } from '../../config';



export const seedData = {
  personas: [
      { Nombres: "John", Apellidos: "Doe", Identificacion: "123456789", FechaNacimiento: new Date("1990-01-01") },
      // más datos de personas...
  ],
  usuarios: [
      { UserName: "johndoe", Password: "hashedpassword", Mail: "john.doe@example.com", SessionActive: true, Status: "active", personaId: "personaId1" },
      // más datos de usuarios...
  ],
  roles: [
      { RolName: "Admin" },
      // más datos de roles...
  ],
  rolUsuarios: [
      { rolId: "rolId1", usuarioId: "usuarioId1" },
      // más datos de rolUsuarios...
  ],
  sessions: [
      { FechaIngreso: new Date(), FechaCierre: new Date(), usuarioId: "usuarioId1" },
      // más datos de sessions...
  ],
  rolOpciones: [
      { NombreOpcion: "Opcion1" },
      // más datos de rolOpciones...
  ],
  rolRolOpciones: [
      { rolId: "rolId1", rolOpcionesId: "rolOpcionesId1" },
      // más datos de rolRolOpciones...
  ]
};