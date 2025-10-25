'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../lib/api';
import { Todo } from '../types/todo';
import { toast } from 'react-toastify';

interface FormData {
  task: string;
}

export default function TodoForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (task) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous todos
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      // Optimistically add the new todo
      const optimisticTodo: Todo = {
        id: Date.now(), // Temporary ID
        task,
        completed: false,
      };
      queryClient.setQueryData(['todos'], [...previousTodos, optimisticTodo]);

      // Return context for rollback
      return { previousTodos };
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    reset();
    toast.success('Todo created successfully');
    },
    onError: (error) => {
    console.error('Error creating todo:', error);
    toast.error('Failed to create todo');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data.task);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="flex gap-2">
        <input
          {...register('task', { required: 'Task is required' })}
          type="text"
          placeholder="Add a new task"
          className="border p-2 rounded flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </div>
      {errors.task && <p className="text-red-500 text-sm">{errors.task.message}</p>}
      {mutation.isError && (
        <p className="text-red-500 text-sm">Failed to create todo</p>
      )}
    </form>
  );
}