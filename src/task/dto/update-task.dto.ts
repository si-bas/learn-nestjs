import { IsString, IsOptional, IsEnum } from "class-validator";
import { TaskStatus } from './../task-status.enum';

export class UpdateTaskDto {
    @IsString()
    id: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}