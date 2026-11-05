import * as taskService from '../services/taskService.js';

/**
 * Handles creating a new task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function createTaskHandler(req, res) {
  const { title, completed } = req.body;
  const newTask = await taskService.createTask({
    title,
    completed,
    userId: req.user.id,
  });
  res.status(201).json(newTask);
}

/**
 * Handles retrieving all tasks across the system.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function getAllTasksHandler(req, res) {
  const tasks = await taskService.findAllTasks();
  res.status(200).json(tasks);
}

/**
 * Handles retrieving tasks owned by the authenticated user.
 * Supports optional filtering with ?completed=true or ?completed=false.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function getMyTasksHandler(req, res) {
  let completed;
  if (req.query.completed === 'true') completed = true;
  else if (req.query.completed === 'false') completed = false;

  const tasks = await taskService.findTasksByUserId(req.user.id, completed);
  res.status(200).json(tasks);
}

/**
 * Handles retrieving a specific task by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function getTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = await taskService.findTaskById(id);
  res.status(200).json(task);
}

/**
 * Handles updating an existing task by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function updateTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  const updatedData = {};
  if (title !== undefined) updatedData.title = title;
  if (completed !== undefined) updatedData.completed = completed;

  const updatedTask = await taskService.updateTaskById(id, updatedData);
  res.status(200).json(updatedTask);
}

/**
 * Handles deleting an existing task by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function deleteTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id, 10);
  await taskService.deleteTaskById(id);
  res.status(204).send();
}