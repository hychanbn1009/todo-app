import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import QueryProvider from '../components/QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <QueryProvider>
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
        <TodoForm />
        <TodoList />
        <ToastContainer />
      </div>
    </QueryProvider>
  );
}