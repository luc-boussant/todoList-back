import { Injectable } from '@nestjs/common';

import { TaskListRepository } from './taskList.repository';
import { CreateTaskDto } from '../task/interfaces/task.dto';
import { TaskRepository } from '../task/task.repository';
import { CreateTaskListDto } from './interfaces/taskList.dto';

@Injectable()
export class TaskListService {
  constructor(
    private readonly taskListRepository: TaskListRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  createTaskList = async (taskDto: CreateTaskListDto) => {
    const createdTaskList = await this.taskListRepository.save(taskDto);
    const { ...createdTaskListDto } = createdTaskList;
    return createdTaskListDto;
  };

  addTask = async (id: string, taskDto: CreateTaskDto) => {
    const task = await this.taskRepository.createTask(taskDto);
    const taskList = await this.taskListRepository.findOneTaskList(id);
    const { ...taskListDto } = taskList;
    if (taskListDto.tasks) {
      taskListDto.tasks.push(task);
    } else {
      taskListDto.tasks = [task];
    }
    return await this.taskListRepository.updateTaskList(id, taskListDto);
  };
}
