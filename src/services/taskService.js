import * as taskRepository from '../repositories/taskRepo.js';

function notFoundError(id) {
  const error = new Error(`Task ${id} not found`);
  error.status = 404;
  return error;
}

export async function createTask(taskData) {
  return taskRepository.create(taskData);
}

export async function findTasksByUserId(userId, completed) {
  return taskRepository.findByUserId(userId, completed);
}

export async function findAllTasks(completed) {
  return taskRepository.findAll(completed);
}

export async function findTaskById(id) {
  const task = await taskRepository.findById(id);
  if (!task) throw notFoundError(id);
  return task;
}

export async function updateTaskById(id, updatedData) {
  const task = await taskRepository.updateById(id, updatedData);
  if (!task) throw notFoundError(id);
  return task;
}

export async function deleteTaskById(id) {
  const task = await taskRepository.deleteById(id);
  if (!task) throw notFoundError(id);
}