import { Todo } from '../../types/todo';
import Button from '../common/Button';

import { Trash2 } from 'lucide-react';

type StatusChangeTodoHandler = (id: string, status: string) => void;
type CompleteTodoHandler = (id: string) => void;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const TodoItem = ({
  todo,
  id,
  changeStatus,
  deleteTodoHandler,
}: {
  todo: Todo;
  id: string;
  changeStatus: StatusChangeTodoHandler;
  deleteTodoHandler: CompleteTodoHandler;
}) => {
  let nextStatusForAdvance: string = todo.status;
  
  if (todo.status === 'pendente') {
    nextStatusForAdvance = 'em andamento';
  } else if (todo.status === 'em andamento') {
    nextStatusForAdvance = 'concluída';
  }
  
  return (
    <div className='flex items-center justify-between py-2 px-4 rounded-lg bg-gray-700 border border-slate-400 mb-2 gap-4'>
      <div
        className={classNames(
          todo.status === 'concluída' ? 'line-through text-slate-300' : '',
          'w-[70%] flex items-center gap-4'
        )}
      >
        <p className='font-extrabold uppercase max-w-[25%]'>{todo?.titulo}</p>
        <p>:</p>
        <p className='max-w-[60%]'>{todo?.descricao}</p>
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
        {todo.status === 'em andamento' && (
          <Button
            variant='danger'
            text='Voltar para Pendente'
            styleClass='w-fit'
            onClick={() => changeStatus(id, 'pendente')}
          />
        )}
        <Button
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
      </div>
      <div className='flex gap-4 items-center flex-end'>
        <Trash2
          className='w-7 h-7 cursor-pointer'
          onClick={() => deleteTodoHandler(id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
