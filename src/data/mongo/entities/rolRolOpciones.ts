import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne, JoinColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { RolOpciones } from "./rolOpciones.entity";

@Entity()
export class RolRolOpciones {
    @ObjectIdColumn()
    id!: ObjectId;

    @ManyToOne(() => Rol, { eager: true })
    @JoinColumn({ name: "rolId" })
    @Column({ type: "string" }) // 👈 Definir tipo explícitamente
    rolId!: string;

    @ManyToOne(() => RolOpciones, { eager: true })
    @JoinColumn({ name: "rolOpcionesId" })
    @Column({ type: "string" }) // 👈 Definir tipo explícitamente
    rolOpcionesId!: string;
}