import { Controller, Post, Get, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('all')
    getAll(): Promise<Task[]> {
        return this.taskService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getOne(id);
    }

    @Post('create')
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Patch('update')
    update(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(updateTaskDto);
    }

    @Delete('delete')
    delete(@Body('id', ParseIntPipe) id: number): void {
        this.taskService.delete(id);
    }
}
