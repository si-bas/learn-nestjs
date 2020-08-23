import { IsString, IsOptional, IsEnum, IsNumber } from "class-validator";
import { TaskStatus } from './../task-status.enum';

export class UpdateTaskDto {
    @IsNumber()
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