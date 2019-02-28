import { Injectable } from '@nestjs/common';

import { TaskListRepository } from './taskList.repository';
import { CreateTaskDto } from '../task/interfaces/task.dto';
import { TaskRepository } from '../task/task.repository';
import { CreateTaskListDto } from './interfaces/taskList.dto';
import { Task } from 'src/task/task.entity';

@Injectable()
export class TaskListService {
  constructor(
    private readonly taskListRepository: TaskListRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  createTaskList = async (taskDto: CreateTaskListDto) => {
    const createdTaskList = await this.taskListRepository.save(taskDto);
    return createdTaskList;
  };

  addTask = async (id: string, taskDto: CreateTaskDto) => {
    const task: Task = await this.taskRepository.createTask(taskDto);
    const taskList = await this.taskListRepository.findOneTaskList(id);
    const taskListDto = { ...taskList, tasks: [...taskList.tasks, task] };
    return await this.taskListRepository.updateTaskList(id, taskListDto);
  };
}
