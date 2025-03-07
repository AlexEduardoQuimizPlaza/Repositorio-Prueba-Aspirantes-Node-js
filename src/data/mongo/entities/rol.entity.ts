import { Entity, ObjectIdColumn, ObjectId, Column} from "typeorm";

@Entity()
export class Rol {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    RolName!: string;
}