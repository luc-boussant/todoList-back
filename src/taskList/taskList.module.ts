import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TaskListController } from './taskList.controller';
import { TaskList } from './taskList.entity';
import { TaskListRepository } from './taskList.repository';
import { TaskListService } from './taskList.service';
import { TaskRepository } from '../task/task.repository';
import { Task } from '../task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, TaskListRepository, Task, TaskRepository])],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
