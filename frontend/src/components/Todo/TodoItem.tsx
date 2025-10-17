import { Todo } from '../../types/todo';
import Button from '../common/Button';

import { Edit2, Trash2 } from 'lucide-react';
import SaveButton from '../common/SaveButton';
import CancelButton from '../common/CancelButton';
import { useState } from 'react';

type StatusChangeTodoHandler = (id: string, status: string) => void;
type UpdateTodoHandler = (id: string, titulo?: string, descricao?: string) => void;
type CompleteTodoHandler = (id: string) => void;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const TodoItem = ({
  todo,
  id,
  changeStatus,
  updateTodoHandler,
  deleteTodoHandler,
}: {
  todo: Todo;
  id: string;
  changeStatus: StatusChangeTodoHandler;
  updateTodoHandler: UpdateTodoHandler;
  deleteTodoHandler: CompleteTodoHandler;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitulo, setEditedTitulo] = useState(todo.titulo || '');
  const [editedDescricao, setEditedDescricao] = useState(todo.descricao || '');

  let nextStatusForAdvance: string = todo.status;
  
  if (todo.status === 'pendente') {
    nextStatusForAdvance = 'em andamento';
  } else if (todo.status === 'em andamento') {
    nextStatusForAdvance = 'concluída';
  }

  const handleSave = () => {
    if (editedTitulo !== todo.titulo || editedDescricao !== todo.descricao) {
      updateTodoHandler(id, editedTitulo, editedDescricao);
    }
    setIsEditing(false);
  }

  const handleCancel = () => {
    setEditedTitulo(todo.titulo || '');
    setEditedDescricao(todo.descricao || '');
    setIsEditing(false);
  }
  
  return (
    <div className='flex items-center justify-between py-2 px-4 rounded-lg bg-gray-700 border border-slate-400 mb-2 gap-4'>
      <div
        className={classNames(
          todo.status === 'concluída' ? 'line-through text-slate-300' : '',
          'w-[70%] flex items-center gap-4'
        )}
      >
        {isEditing ? (
          <input
            type="text"
            className="font-extrabold uppercase max-w-[25%] bg-gray-600 p-1 rounded text-white"
            value={editedTitulo}
            onChange={(e) => setEditedTitulo(e.target.value)}
          />
        ) : (
          <p className='font-extrabold uppercase max-w-[25%]'>{todo?.titulo}</p>
        )}
        
        <p>:</p>
        
        {isEditing ? (
          <input
            type="text"
            className="max-w-[60%] bg-gray-600 p-1 rounded text-white"
            value={editedDescricao}
            onChange={(e) => setEditedDescricao(e.target.value)}
          />
        ) : (
          <p className='max-w-[60%]'>{todo?.descricao}</p>
        )}
        
        {todo.status && (
          <>
            <p>-</p>
            <p className='max-w-[40%]'>
              {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
            </p>
          </>
        )}
        {todo.data_conclusao && (
          <>
            <p>-</p>
            <p>Data de conclusão: {new Date(todo.data_conclusao).toLocaleString()}</p>
          </>
        )}
      </div>

      <div className='flex gap-4 ml-auto flex-end'>
        {todo.status === 'em andamento' && !isEditing && (
          <Button
            variant='danger'
            text='Voltar para Pendente'
            styleClass='w-fit'
            onClick={() => changeStatus(id, 'pendente')}
          />
        )}
        {!isEditing && ( <Button
            variant={
              todo.status === 'pendente' ? 'warning' : 
              todo.status === 'em andamento' ? 'primary' : 'success'} 
            text={
              todo.status === 'pendente' ? 'Iniciar Tarefa' : 
              todo.status === 'em andamento' ? 'Concluir Tarefa' : 
              'Concluída'
            }
            styleClass='w-fit'
            disabled={todo.status === 'concluída'} 
            onClick={() => changeStatus(id, nextStatusForAdvance)} 
          ></Button>
        )}

        {isEditing && (
          <>
            <SaveButton
              variant='success'
              text='Salvar'
              styleClass='w-fit flex items-center gap-1'
              onClick={handleSave}
            />
            <CancelButton
              variant='danger'
              text='Cancelar'
              styleClass='w-fit flex items-center gap-1'
              onClick={handleCancel}
            />
          </>
        )}
      </div> 
      <div className='flex gap-4 items-center flex-end'>
        {!isEditing && (
            <Edit2
              className='w-7 h-7 cursor-pointer hover:text-blue-400' 
              onClick={() => setIsEditing(true)}        
            />
        )}
        <Trash2
          className='w-7 h-7 cursor-pointer hover:text-red-400'
          onClick={() => deleteTodoHandler(id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
