import { TaskDto } from '../../task/interfaces/task.dto';

export class TaskListDto {
  id?: number;
  name: string;
  tasks: TaskDto[];
}
