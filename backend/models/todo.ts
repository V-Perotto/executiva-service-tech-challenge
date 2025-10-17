import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'concluída'],
    default: 'pendente',
  },
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_conclusao: {
    type: Date,
  },
});

const Todo = mongoose.model('todos', TodoSchema);
export default Todo;
