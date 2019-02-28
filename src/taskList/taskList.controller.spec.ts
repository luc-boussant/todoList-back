import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';

import { TaskListController } from './taskList.controller';
import { TaskListDto } from './interfaces/taskList.dto';
import { TaskList } from './taskList.entity';
import { TaskListRepository } from './taskList.repository';
import { TaskListService } from './taskList.service';

const TASKLIST_1: TaskListDto = { id: 1, name: 'name1', tasks: [] };
const TASKLIST_2: TaskListDto = { id: 2, name: 'name2', tasks: [] };

describe('TaskListController', () => {
  let taskListController: TaskListController;
  let taskListRepository: TaskListRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TaskList, TaskListRepository])],
      controllers: [TaskListController],
      providers: [TaskListService],
    }).compile();

    taskListController = app.get<TaskListController>(TaskListController);
    taskListRepository = app.get<TaskListRepository>(TaskListRepository);
    await taskListRepository.clear();
  });

  afterEach(async () => {
    await taskListRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('taskList', () => {
    it('should find all taskLists', async () => {
      const createdTaskList = await taskListRepository.createTaskList(TASKLIST_1);
      expect(await taskListController.findAll()).toEqual([createdTaskList]);
    });
  });
});
