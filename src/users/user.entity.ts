import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 60, nullable: false })
    name: string;

    @Column({ nullable: false, length: 60 })
    password: string;

    @Column({ unique: true, length: 60, nullable: false })
    email: string;
}
