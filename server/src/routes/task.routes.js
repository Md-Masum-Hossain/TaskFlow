import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { createTaskSchema, updateTaskSchema } from '../validations/task.validation.js';

const router = Router();

router.get('/', protect, getTasks);
router.post('/', protect, validate(createTaskSchema), createTask);
router.put('/:id', protect, validate(updateTaskSchema), updateTask);
router.delete('/:id', protect, deleteTask);

export default router;