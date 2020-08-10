import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    public getAll(): Task[] {
        return this.tasks;
    }

    public getOne(id: string) {
        return this.tasks.find(task => task.id === id);
    }

    public create(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    public update(updateTaskDto: UpdateTaskDto): Task {
        const { id } = updateTaskDto;
        const task = this.getOne(id);
        for (const key in updateTaskDto) {
            if (Object.prototype.hasOwnProperty.call(task, key)) {
                task[key] = updateTaskDto[key];
            }
        }
        return task;
    }

    public delete(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
