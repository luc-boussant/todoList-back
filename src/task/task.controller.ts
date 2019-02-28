import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

import { TaskDto } from './interfaces/task.dto';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(
    @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository,
    private readonly taskService: TaskService,
  ) {}

  @Post()
  create(@Body() taskDto: TaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Get()
  findAll() {
    return this.taskRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskRepository.findOneTask(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskRepository.removeTask(id);
  }
}
