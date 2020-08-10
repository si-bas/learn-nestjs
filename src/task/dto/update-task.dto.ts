import { IsString, IsOptional } from "class-validator";
import { TaskStatus } from './../task.model';

export class UpdateTaskDto {
    @IsString()
    id: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsOptional()
    status: TaskStatus;
}