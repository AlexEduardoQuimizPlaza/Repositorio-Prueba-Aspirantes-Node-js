import { Entity, ObjectIdColumn, ObjectId, Column,ManyToOne,JoinColumn } from "typeorm";
import {Persona} from "./persona.entity";

@Entity()
export class Usuario {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ length: 50 })
    UserName!: string;

    @Column({ length: 50 })
    Password!: string;

    @Column({ length: 120 })
    Mail!: string;

    @Column({ type: "boolean", default: true })
    SessionActive!: boolean;

    @Column({ type: "string", length: 20 })
    Status!: string;

    @ManyToOne(() => Persona, { eager: true })  // Relación con Persona
    @JoinColumn({ name: "personaId" })  
    @Column({ type: "string" }) // 👈 Definimos explícitamente el tipo
    personaId!: string;
}

