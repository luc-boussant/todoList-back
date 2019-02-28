import { TaskDto } from '../../task/interfaces/task.dto';

export class EditTaskListDto {
  id: number;
  name: string;
  tasks: TaskDto[];
}

export class CreateTaskListDto {
  name: string;
  tasks: TaskDto[];
}
