// src/services/todoService.ts
import { createClient } from '@supabase/supabase-js';
import type { Todo } from '../types/todo'
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`Error fetching todos: ${error.message}`);
  }

  return data as Todo[];
};

export const getTodoById = async (id: number): Promise<Todo | null> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching todo: ${error.message}`);
  }

  return data as Todo | null;
};

export const createTodo = async (task: string): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ task, completed: false }])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating todo: ${error.message}`);
  }

  return data as Todo;
};

export const updateTodo = async (
  id: number,
  updates: Partial<Todo>
): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating todo: ${error.message}`);
  }

  return data as Todo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting todo: ${error.message}`);
  }
};