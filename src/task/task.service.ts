import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    public async getAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    public async getOne(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task)
            throw new NotFoundException('Task with ID "' + id + '" not found');

        return task;
    }

    public async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            created_at: new Date()
        });
        task.save();

        return task;
    }

    public async update(updateTaskDto: UpdateTaskDto): Promise<Task> {
        const { id } = updateTaskDto;
        const task = await this.getOne(id);

        delete updateTaskDto.id;
        for (const key in updateTaskDto) {
            if (Object.prototype.hasOwnProperty.call(task, key)) {
                task[key] = updateTaskDto[key];
            }
        }
        await task.save();
        
        return task;
    }

    public async delete(id: number): Promise<void> {
        this.taskRepository.delete(id);
    }
}
