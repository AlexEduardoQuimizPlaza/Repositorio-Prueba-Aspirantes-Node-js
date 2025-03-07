import { Entity, ObjectIdColumn, ObjectId, Column} from "typeorm";



@Entity()
export class RolOpciones {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    NombreOpcion!: string;
}