'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, updateTodo, deleteTodo } from '../lib/api';
import { Todo } from '../types/todo';

export default function TodoList() {
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  // Mutation for updating a todo
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Pick<Todo, 'task' | 'completed'>> }) =>
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error updating todo:', error);
    },
  });

  // Mutation for deleting a todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error deleting todo:', error);
    },
  });

  const handleToggle = (id: number, completed: boolean) => {
    updateMutation.mutate({ id, data: { completed: !completed } });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      {todos?.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id, todo.completed)}
                  className="h-5 w-5"
                  disabled={updateMutation.isPending}
                />
                <span className={todo.completed ? 'line-through' : ''}>{todo.task}</span>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700"
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}