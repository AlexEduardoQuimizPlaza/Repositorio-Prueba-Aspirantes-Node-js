import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne, JoinColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Usuario } from "./user.entity";

@Entity()
export class RolUsuario {
    @ObjectIdColumn()
    id!: ObjectId;

    @ManyToOne(() => Rol, { eager: true })
    @JoinColumn({ name: "rolId" })
    @Column({ type: "string" })  // 👈 Definimos el tipo explícitamente
    rolId!: string;

    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: "usuarioId" })
    @Column({ type: "string" })  // 👈 Definimos el tipo explícitamente
    usuarioId!: string;
}