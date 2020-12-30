import { Router } from 'express'
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getTodoById,
} from '../controllers/todos.controller'

const router = Router()

router.post('/', createTodo)
router.get('/', getTodos)
router.get('/:id', getTodoById)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router
