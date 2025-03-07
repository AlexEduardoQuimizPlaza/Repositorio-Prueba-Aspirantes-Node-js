import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Persona {
    @ObjectIdColumn()
    id!: ObjectId; // MongoDB usa ObjectID en lugar de números generados automáticamente

    @Column()
    Nombres!: string;

    @Column()
    Apellidos!: string;

    @Column()
    Identificacion!: string;

    @Column()
    FechaNacimiento!: Date;
}