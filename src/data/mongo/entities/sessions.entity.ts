import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./user.entity";

@Entity()
export class Sessions {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ type: "date" })
    FechaIngreso!: Date;

    @Column({ type: "date" })
    FechaCierre!: Date;

    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: "usuarioId" })
    @Column({ type: "string" })  // 👈 Definimos el tipo explícitamente
    usuarioId!: string;
}