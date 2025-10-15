import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: { createdAt: 'data_criacao' } })
export class Todo {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao: string;

  @Prop({
    type: String,
    enum: ['pendente', 'em_andamento', 'concluida'],
    default: 'pendente',
  })
  status: 'pendente' | 'em_andamento' | 'concluida';

  @Prop({ type: Date })
  data_conclusao?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
