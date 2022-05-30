import axios from 'axios'
import UrlPattern from 'url-pattern';

const axiosInstance = axios.create({
  baseURL: 'https://crudcrud.com/api/5f1f3740dc6043e482aefd50b5847972',
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
  },
});

const getUrl = (urlPattern: string, params?: Record<string, unknown>) => {
  const pattern = new UrlPattern(urlPattern);
  return pattern.stringify(params);
};

type Todo = {
  id: number,
  description: string,
}

export const getTodo = () => {
  return axiosInstance.request<Todo[]>({
    method: 'get',
    url: '/task',
  })
}

export const addTodo = (description: string) => {
  return axiosInstance.request({
    method: 'post',
    url: '/task',
    data: {
      description,
    }
  })
}

export const updateTodo = ({
  id,
  description,
}: { id: string, description: string }) => {
  const url = getUrl('/task/:id', { id })
  return axiosInstance.request({
    method: 'put',
    url,
    data: {
      description,
    }
  })
}

export const deleteTodo = (id: string) => {
  const url = getUrl('/task/:id', { id })
  return axiosInstance.request({
    method: 'delete',
    url,
  })
}