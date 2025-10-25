import type { Request, Response } from 'express';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import type { Todo } from '../types/todo';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id && typeof req.params.id === 'string' ? parseInt(req.params.id, 10) : undefined;
    if (!id) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
    }
    const todo = await getTodoById(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createNewTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task } = req.body;
    if (!task || typeof task !== 'string') {
      res.status(400).json({ error: 'Task is required and must be a string' });
      return;
    }
    const todo = await createTodo(task);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateExistingTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id && typeof req.params.id === 'string' ? parseInt(req.params.id, 10) : undefined;
    if (!id) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
    }
    const { task, completed } = req.body;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }
    if (!task && completed === undefined) {
      res.status(400).json({ error: 'At least one field (task or completed) is required' });
      return;
    }
    const updates: Partial<Todo> = {};
    if (task) updates.task = task;
    if (completed !== undefined) updates.completed = completed;
    const todo = await updateTodo(id, updates);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteExistingTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id && typeof req.params.id === 'string' ? parseInt(req.params.id, 10) : undefined;
    if (!id) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
    }
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }
    await deleteTodo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};