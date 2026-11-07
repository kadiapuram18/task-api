import * as taskService from '../services/taskService.js';

function parseCompleted(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export async function createTaskHandler(req, res) {
  const { title, completed } = req.body;
  const newTask = await taskService.createTask({
    title,
    completed,
    userId: req.user.id,
  });
  res.status(201).json(newTask);
}

export async function getAllTasksHandler(req, res) {
  const completed = parseCompleted(req.query.completed);
  const tasks = await taskService.findAllTasks(completed);
  res.status(200).json(tasks);
}

export async function getMyTasksHandler(req, res) {
  const completed = parseCompleted(req.query.completed);
  const tasks = await taskService.findTasksByUserId(req.user.id, completed);
  res.status(200).json(tasks);
}

export async function getTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = await taskService.findTaskById(id);
  res.status(200).json(task);
}

export async function updateTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  const updatedData = {};
  if (title !== undefined) updatedData.title = title;
  if (completed !== undefined) updatedData.completed = completed;

  const updatedTask = await taskService.updateTaskById(id, updatedData);
  res.status(200).json(updatedTask);
}

export async function deleteTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id, 10);
  await taskService.deleteTaskById(id);
  res.status(204).send();
}