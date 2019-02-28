import { EntityRepository, Repository } from 'typeorm';
import { EditTaskDto, CreateTaskDto } from './interfaces/task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask = async (taskDto: CreateTaskDto) => {
    return await this.save(taskDto);
  };

  findOneTask = async (id: string) => {
    return this.findOneOrFail(id);
  };

  updateTask = async (id: string, taskDto: EditTaskDto) => {
    return this.save({ ...taskDto, id: Number(id) });
  };

  removeTask = async (id: string) => {
    await this.findOneOrFail(id);
    return this.delete(id);
  };
}
