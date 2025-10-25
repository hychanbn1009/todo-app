import { Router } from 'express';
import {
  getAllTodos,
  getTodo,
  createNewTodo,
  updateExistingTodo,
  deleteExistingTodo,
} from '../controllers/todoController';

const router = Router();

router.get('/todos', getAllTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', createNewTodo);
router.put('/todos/:id', updateExistingTodo);
router.delete('/todos/:id', deleteExistingTodo);

export default router;