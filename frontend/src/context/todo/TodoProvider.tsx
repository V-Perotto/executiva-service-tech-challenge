import { useReducer } from 'react';
import axios from 'axios';

import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TODO_FAIL,
  CLEAR_ERROR,
  CHANGE_STATUS,
  SET_LOADING,
  SET_TODO_LOADING,
} from '../types';
import TodoReducer from './TodoReducer';
import TodoContext from './TodoContext';
import { Todo } from '../../types/todo';
import setAuthToken from '../../utils/SetAuthToken';

const TodoProvider = (props: any) => {
  const initialState = {
    todos: [],
    loading: false,
    todoLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const url = import.meta.env.VITE_BACKEND_URL;

  const getTodos = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({ type: SET_TODO_LOADING });
      const res = await axios.get(url + '/todos');
      dispatch({
        type: GET_TODOS,
        payload: res.data.todos,
      });
    } catch (err: any) {
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const createTodo = async (todo: Todo) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: SET_LOADING,
      });
      const res = await axios.post(url + '/todos', todo);
      dispatch({
        type: CREATE_TODO,
        payload: {
          _id: res.data.todo._id,
          titulo: res.data.todo.titulo,
          status: res.data.todo.status,
          descricao: res.data.todo.descricao,
          data_criacao: res.data.todo.data_criacao,
          data_conclusao: res.data.todo.data_conclusao,
        },
      });
    } catch (err: any) {
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const updateTodo = async (id: string, updates: { titulo?: string, descricao?: string }) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({ type: SET_LOADING });
      
      await axios.put(url + '/todos', { id, ...updates });

      dispatch({
        type: UPDATE_TODO,
        payload: {
          id,
          ...updates,
        },
      });
    } catch (err: any) {
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: SET_LOADING,
      });
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
      await axios.delete(url + `/todos/${id}`);
    } catch (err: any) {
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const changeStatus = async (id: string, status: string) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: CHANGE_STATUS,
        payload:{ 
          id,
          status,
        }
      });
      await axios.put(url + '/todos', {
        id,
        status
      });
    } catch (err: any) {
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoLoading: state.todoLoading,
        loading: state.loading,
        todos: state.todos,
        error: state.error,
        createTodo,
        updateTodo,
        changeStatus,
        clearError,
        getTodos,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
