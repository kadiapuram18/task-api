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
  getAllTasksHandler,
  getMyTasksHandler,
  getTaskByIdHandler,
  updateTaskByIdHandler,
  deleteTaskByIdHandler,
} from '../controllers/taskController.js';

const router = express.Router();

// GET /tasks: check ?completed first (400 if invalid).
// No token -> return all tasks. With token -> return only the user's tasks.
router.get(
  '/',
  validateTaskQuery,
  (req, res, next) => {
    if (!req.headers.authorization) {
      return getAllTasksHandler(req, res, next);
    }
    next();
  },
  authenticate,
  getMyTasksHandler,
);

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