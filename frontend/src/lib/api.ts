import axios, { AxiosResponse } from "axios";
import { Todo } from '../types/todo';

// Base API URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response: AxiosResponse<Todo[]> = await api.get('/todos');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch todos');
  }
};

export const createTodo = async (task: string): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await api.post('/todos', { task });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create todo');
  }
};

export const updateTodo = async (
  id: number,
  data: Partial<Pick<Todo, 'task' | 'completed'>>
): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await api.put(`/todos/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update todo');
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    throw new Error('Failed to delete todo');
  }
};