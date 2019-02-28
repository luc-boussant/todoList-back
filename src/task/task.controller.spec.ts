import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';

import { TaskController } from './task.controller';
import { TaskDto } from './interfaces/task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

const TASK_1: TaskDto = { id: 1, name: 'name1', date: new Date('2018-06-10') };
const TASK_2: TaskDto = { id: 2, name: 'name2', date: new Date('2017-10-11') };

describe('TaskController', () => {
  let taskController: TaskController;
  let taskRepository: TaskRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Task, TaskRepository])],
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    taskRepository = app.get<TaskRepository>(TaskRepository);
    await taskRepository.clear();
  });

  afterEach(async () => {
    await taskRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('task', () => {
    it('should find all tasks', async () => {
      const createdTask = await taskRepository.createTask(TASK_1);
      expect(await taskController.findAll()).toEqual([createdTask]);
    });
  });
});
