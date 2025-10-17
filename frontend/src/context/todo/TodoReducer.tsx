import {
  GET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  CHANGE_STATUS,
  TODO_FAIL,
  SET_LOADING,
  SET_TODO_LOADING,
} from '../types';

const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_TODO_LOADING:
      return {
        ...state,
        todoLoading: true,
      };

    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        todoLoading: false,
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: any) => todo && todo._id !== action.payload),
        loading: false,
      };

    case CHANGE_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo: any) => {
          if (todo && todo._id === action.payload.id) {
            return {
              ...todo,
              status: action.payload.status,
              data_conclusao: action.payload.status === 'concluída' ? new Date().toISOString() : todo.data_conclusao,
            };
          }
          return todo;
        }),
        loading: false,
    };

    case TODO_FAIL:
      return {
        ...state,
        loading: false,
        todoLoading: false,
        error: action.payload ? action.payload : null,
      };

    default:
      return state;
  }
};

export default todoReducer;