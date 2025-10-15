import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todos.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(dto: { titulo: string; descricao?: string }): Promise<Todo> {
    const todo = new this.todoModel({
      ...dto,
    });
    return todo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find({}).sort({ data_criacao: -1 });
  }

  async updateStatus(id: string, status: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id });
    if (!todo) throw new NotFoundException('Tarefa não encontrada');
    todo.data_conclusao = status === 'concluida' ? new Date() : undefined;
    return todo.save();
  }

  async remove(id: string): Promise<any> {
    return this.todoModel.deleteOne({ _id: id });
  }
}
