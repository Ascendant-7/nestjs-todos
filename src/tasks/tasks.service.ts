import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const user = this.tasksRepo.create(createTaskDto);
    return this.tasksRepo.save(user);
  }

  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepo.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }

  // code from teacher

  getTask(id: string) {
    console.log(id);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  createTask(body: any) {
    console.log(body);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  updateTask(id: string, body: any) {
    console.log(body);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  deleteTask(id: string) {
    console.log(id);
    return { message: 'success' };
  }
}
