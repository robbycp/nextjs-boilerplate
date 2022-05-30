import {createAxios, createExportedEndpoint} from '~/utils/api';

export interface Todo {
  _id: string;
  description: string;
  completed: boolean;
  createdAt: string;
  owner: string;
  updatedAt: string;
  __v: number;
}
const initialTodo: Todo = {
  _id: '',
  description: '',
  completed: false,
  createdAt: '',
  owner: '',
  updatedAt: '',
  __v: 0,
};

const apiCrudBase = createAxios({
  baseURL: process.env.NEXT_PUBLIC_API_TODO ?? '',
});

export interface TodoEndpoints {
  useTodoAdd: Endpoint<Pick<Todo, 'description'>, Todo>;
  useTodoAllGet: Endpoint<{}, Todo[]>;
  useTodoByIdGet: Endpoint<{}, Todo>;
  useTodoByIdUpdate: Endpoint<{}, { data: Todo, success: boolean }>;
  useTodoByIdDelete: Endpoint<{}, {}>;
}

const endpoints: TodoEndpoints = {
  useTodoAdd: {
    method: 'post',
    path: '/task',
    response: {...initialTodo},
  },
  useTodoAllGet: {
    method: 'get',
    path: '/task',
    response: [],
  },
  useTodoByIdGet: {
    method: 'get',
    path: '/task/:id',
    response: {...initialTodo},
  },
  useTodoByIdUpdate: {
    method: 'put',
    path: '/task/:id',
    response: {
      data: {
        ...initialTodo,
      },
      success: true,
    },
  },
  useTodoByIdDelete: {
    method: 'delete',
    path: '/task/:id',
    response: {},
  }
};

export default createExportedEndpoint(apiCrudBase, endpoints);
