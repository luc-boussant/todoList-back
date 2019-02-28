import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

import { TaskListDto } from './interfaces/taskList.dto';
import { TaskListRepository } from './taskList.repository';
import { TaskListService } from './taskList.service';
import { TaskDto } from '../task/interfaces/task.dto';
import { TaskRepository } from '../task/task.repository';

@Controller('taskLists')
export class TaskListController {
  constructor(
    @InjectRepository(TaskListRepository) private readonly taskListRepository: TaskListRepository,
    @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository,
    private readonly taskListService: TaskListService,
  ) {}

  @Post()
  create(@Body() taskDto: TaskDto) {
    return this.taskListService.createTaskList(taskDto);
  }

  @Get()
  findAll() {
    return this.taskListRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskListRepository.findOneTaskList(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() taskListDto: TaskListDto) {
    return this.taskListRepository.updateTaskList(id, taskListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListRepository.removeTaskList(id);
  }

  @Put(':id/task')
  addTask(@Param('id') id: string, @Body() taskDto: TaskDto) {
    return this.taskListService.addTask(id, taskDto);
  }
}
