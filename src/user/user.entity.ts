import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskList } from '../taskList/taskList.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(type => TaskList, taskList => taskList.author)
  taskLists: TaskList[];
}
