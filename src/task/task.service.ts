import { Injectable } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { TaskDto } from './interfaces/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  createTask = async (taskDto: TaskDto) => {
    const createdTask = await this.taskRepository.save(taskDto);
    const { ...createdTaskDto } = createdTask;
    return createdTaskDto;
  };
}
