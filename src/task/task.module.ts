import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
