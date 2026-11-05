import express from 'express';
import { authenticate, requireTaskOwnership } from '../middleware/auth.js';
import {
  validateId,
  validateCreateTask,
  validateUpdateTask,
  validateTaskQuery,
} from '../middleware/validators.js';
import {
  createTaskHandler,
  getMyTasksHandler,
  getTaskByIdHandler,
  updateTaskByIdHandler,
  deleteTaskByIdHandler,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', authenticate, validateTaskQuery, getMyTasksHandler);

router.post('/', authenticate, validateCreateTask, createTaskHandler);

router.get('/:id', authenticate, validateId, requireTaskOwnership, getTaskByIdHandler);

router.put(
  '/:id',
  authenticate,
  validateId,
  validateUpdateTask,
  requireTaskOwnership,
  updateTaskByIdHandler,
);

router.delete('/:id', authenticate, validateId, requireTaskOwnership, deleteTaskByIdHandler);

export default router;