import { TaskList } from './taskList.entity';
import { EntityRepository, Repository, FindOneOptions } from 'typeorm';
import { TaskListDto } from './interfaces/taskList.dto';

@EntityRepository(TaskList)
export class TaskListRepository extends Repository<TaskList> {
  createTaskList = async (taskListDto: TaskListDto) => {
    return await this.save(taskListDto);
  };

  findOneTaskList = async (id: string, options?: FindOneOptions<TaskList>) => {
    return this.findOneOrFail(id, options);
  };

  updateTaskList = async (id: string, taskListDto: TaskListDto) => {
    return this.save({ ...taskListDto, id: Number(id) });
  };

  removeTaskList = async (id: string) => {
    await this.findOneOrFail(id);
    return this.delete(id);
  };
}
