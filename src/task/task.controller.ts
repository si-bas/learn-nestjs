import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('all')
    getAll(): Task[] {
        return this.taskService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') id:string): Task {
        return this.taskService.getOne(id);
    }

    @Post('create')
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.create(createTaskDto);
    }

    @Patch('update')
    update(@Body() updateTaskDto: UpdateTaskDto): Task {
        return this.taskService.update(updateTaskDto);
    }

    @Delete('delete')
    delete(@Body('id') id: string): void {
        this.taskService.delete(id);
    }
}
