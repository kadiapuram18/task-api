import * as taskRepository from '../repositories/taskRepo.js';

function notFoundError(id) {
  const error = new Error(`Task ${id} not found`);
  error.status = 404;
  return error;
}

/**
 * Creates a new task record.
 * @param {Object} taskData
 * @returns {Promise<Object>} The newly created task.
 */
export async function createTask(taskData) {
  return taskRepository.create(taskData);
}

/**
 * Retrieves tasks associated with a specific user,
 * optionally filtered by completion status.
 * @param {number} userId - The user ID.
 * @param {boolean} [completed] - Optional filter: true, false, or undefined for all.
 * @returns {Promise<Array>} List of user tasks.
 */
export async function findTasksByUserId(userId, completed) {
  return taskRepository.findByUserId(userId, completed);
}

/**
 * Retrieves all tasks across the system.
 * @returns {Promise<Array>} List of all tasks.
 */
export async function findAllTasks() {
  return taskRepository.findAll();
}

/**
 * Retrieves a single task by its ID.
 * @param {number} id - The task ID.
 * @returns {Promise<Object>} The found task.
 * @throws {Error} Throws a 404 error if the task is not found.
 */
export async function findTaskById(id) {
  const task = await taskRepository.findById(id);
  if (!task) throw notFoundError(id);
  return task;
}

/**
 * Updates a task by its ID.
 * @param {number} id - The task ID.
 * @param {Object} updatedData
 * @returns {Promise<Object>} The updated task.
 * @throws {Error} Throws a 404 error if the task is not found.
 */
export async function updateTaskById(id, updatedData) {
  const task = await taskRepository.updateById(id, updatedData);
  if (!task) throw notFoundError(id);
  return task;
}

/**
 * Deletes a task by its ID.
 * @param {number} id - The task ID.
 * @returns {Promise<void>} Resolves with no content when deletion is successful.
 * @throws {Error} Throws a 404 error if the task is not found.
 */
export async function deleteTaskById(id) {
  const task = await taskRepository.deleteById(id);
  if (!task) throw notFoundError(id);
}