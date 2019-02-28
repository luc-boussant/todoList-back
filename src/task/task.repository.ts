import { EntityRepository, Repository } from 'typeorm';
import { TaskDto } from './interfaces/task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask = async (taskDto: TaskDto) => {
    return await this.save(taskDto);
  };

  findOneTask = async (id: string) => {
    return this.findOneOrFail(id);
  };

  updateTask = async (id: string, taskDto: TaskDto) => {
    return this.save({ ...taskDto, id: Number(id) });
  };

  removeTask = async (id: string) => {
    await this.findOneOrFail(id);
    return this.delete(id);
  };
}
