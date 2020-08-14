import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity({
    name: 'tasks'
})
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: TaskStatus;

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;
}