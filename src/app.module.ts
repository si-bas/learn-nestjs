import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TaskModule,]
})
export class AppModule { }
