import { TaskList } from './taskList.entity';
import { EntityRepository, Repository, FindOneOptions } from 'typeorm';
import { EditTaskListDto, CreateTaskListDto } from './interfaces/taskList.dto';

@EntityRepository(TaskList)
export class TaskListRepository extends Repository<TaskList> {
  createTaskList = async (taskListDto: CreateTaskListDto) => {
    return await this.save(taskListDto);
  };

  findOneTaskList = async (id: string) => {
    return this.findOneOrFail(id, { relations: ['tasks'] });
  };

  updateTaskList = async (id: string, taskListDto: EditTaskListDto) => {
    return this.save({ ...taskListDto, id: Number(id) });
  };

  removeTaskList = async (id: string) => {
    await this.findOneOrFail(id);
    return this.delete(id);
  };
}
