import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getTasks);
router.post('/', protect, createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;