import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Input from '../common/Input.tsx';
import Button from '../common/Button.tsx';
import TodoItem from './TodoItem.tsx';
import TodosLoader from './TodosLoader.tsx';
import { UserState } from '../../types/user.ts';
import { Todo, TodoState } from '../../types/todo.ts';
import AuthContext from '../../context/auth/AuthContext.tsx';
import TodoContext from '../../context/todo/TodoContext.ts';
import LogoutButton from '../common/LogoutButton.tsx';

const TodoLayout = () => {
  const navigate = useNavigate();
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    titulo: '',
    descricao: '',
    status: 'pendente',
    data_criacao: new Date(),
  });
  const { logout }: UserState = useContext(AuthContext);
  const {
    todos,
    todoLoading,
    loading,
    error,
    getTodos,
    createTodo,
    updateTodo,
    changeStatus,
    deleteTodo,
    clearError,
  } = useContext<TodoState>(TodoContext);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({
      ...currentTodo,
      [e.target.name]: e.target.value,
    });
  };

  const checkValid = () => {
    if (
      currentTodo.titulo === '' ||
      currentTodo.descricao === '' ||
      currentTodo.status === '' ||
      currentTodo.data_criacao === null
    ) {
      toast.error('Preencha todos os campos', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return false;
    }
    return true;
  };

  const clearCurrentTodo = () => {
    setCurrentTodo({
      titulo: '',
      descricao: '',
      status: 'pendente',
      data_criacao: new Date(),
    });
  };

  const addTodoHandler = async () => {
    const loadingToast = toast.loading('Adicionando Tarefa...', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    try {
      if (!checkValid()) {
        toast.dismiss(loadingToast); return;
      }

      if (!createTodo) {
        toast.error('Algo deu errado', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      await createTodo(currentTodo);
      if (!error) {
        toast.success('Tarefa adicionada com sucesso', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        toast.dismiss(loadingToast);
        clearCurrentTodo();
      }
    } catch (err) {
      toast.error(error as string, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const changeStatusHandler = async (id: string, currentStatus: string) => {
    try {
      const loadingToast = toast.loading('Mudando status da Tarefa...', {
        style: { background: '#333', color: '#fff' },
      });

      if (!changeStatus) {
        toast.error('Função de mudança de status não encontrada.', {
          style: { background: '#333', color: '#fff' },
        });
        toast.dismiss(loadingToast);
        return;
      }

      const validStatuses = ['pendente', 'em andamento', 'concluída'];

      if (!validStatuses.includes(currentStatus.toLowerCase())) {
        toast.error('Status inválido. A tarefa pode já estar concluída.', {
          style: { background: '#333', color: '#fff' },
        });
        toast.dismiss(loadingToast);
        return;
      }

      await changeStatus(id, currentStatus); 

      if (!error && !loading) {
        toast.success(`Status alterado para "${currentStatus}" com sucesso!`, {
          style: { background: '#333', color: '#fff' },
        });
      }

      toast.dismiss(loadingToast);
    } catch (err) {
      toast.error(error || (err as string), {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  const updateTodoHandler = async (id: string, titulo?: string, descricao?: string) => {
    try {
      const loadingToast = toast.loading('Editando Tarefa...', {
        style: { background: '#333', color: '#fff' },
      });

      if (!updateTodo) {
        toast.error('Função de edição de tarefa não encontrada.', {
          style: { background: '#333', color: '#fff' },
        });
        toast.dismiss(loadingToast);
        return;
      }

      if (!id) {
        toast.error('ID da tarefa não fornecido.', {
          style: { background: '#333', color: '#fff' },
        });
        toast.dismiss(loadingToast);
        return;
      }

      const updates: { titulo?: string, descricao?: string } = {};

      if (titulo !== undefined && titulo.trim() !== '') {
        updates.titulo = titulo;
      }
      if (descricao !== undefined && descricao.trim() !== '') {
        updates.descricao = descricao;
      }

      if (Object.keys(updates).length === 0) {
        toast.error('Nenhum campo para editar fornecido.', {
          style: { background: '#333', color: '#fff' },
        });
        toast.dismiss(loadingToast);
        return;
      }
      
      await updateTodo(id, updates); 

      if (!error && !loading) {
        toast.success('Tarefa editada com sucesso!', {
          style: { background: '#333', color: '#fff' },
        });
      }

      toast.dismiss(loadingToast);
    } catch (err) {
      toast.error(error || (err as string), {
        style: { background: '#333', color: '#fff' },
      });
    }
  }

  const deleteTodoHandler = async (id: string) => {
    try {
      const loadingToast = toast.loading('Excluindo Tarefa...', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });

      if (!deleteTodo) {
        toast.error('Algo deu errado', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      await deleteTodo(id);
      if (!error && !loading) {
        toast.success('Tarefa excluida com sucesso', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        toast.dismiss(loadingToast);
      }
    } catch (err) {
      toast.error(error as string, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const logoutHandler = () => {
    logout();
    toast.success('Desconectado com sucesso', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    navigate('/user/login');
  };

  useEffect(() => {
    getTodos && getTodos();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      if (clearError) {
        clearError();
      }
    }
  }, [clearError, error]);

  return (
    <div className='w-[100vw]'>
      <div className='w-full flex justify-center text-center my-8'>
        <p className='font-bold text-4xl'>Executiva Service TODO App</p>
      </div>
      <div className='absolute flex justify-center space-x-6 top-8 right-8'>
        <LogoutButton
          text='Sair'
          styleClass='py-1'
          onClick={logoutHandler}
          variant='danger'
        />
      </div>
      <div className='flex w-[95%] mx-auto gap-8'>
        <div className='add-todo-container w-1/4'>
          <Input
            type='text'
            name='titulo'
            value={currentTodo.titulo}
            placeholder='Título'
            styleClass='mb-4 shadow-md shadow-emerald-700'
            onChange={onInputChange}
          />
          <Input
            type='text'
            name='descricao'
            value={currentTodo.descricao}
            placeholder='Descrição'
            styleClass='mb-4 shadow-md shadow-emerald-700'
            onChange={onInputChange}
          />
          <Button 
            text='Adicionar Tarefa' 
            onClick={addTodoHandler} 
            variant="success"
          />
        </div>
        <div className='w-3/4 max-h-[95vh] flex flex-col gap-4'>
          {todoLoading ? (
            <TodosLoader />
          ) : (
            todos &&
            todos?.length > 0 &&
            todos
              .filter(todo => todo !== null && todo !== undefined) 
              .map((todo, idx) => {
              return (
                <TodoItem
                  key={idx}
                  todo={todo}
                  id={todo._id as string}
                  deleteTodoHandler={deleteTodoHandler}
                  updateTodoHandler={updateTodoHandler}
                  changeStatus={changeStatusHandler}
                />
              );
            })
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TodoLayout;
