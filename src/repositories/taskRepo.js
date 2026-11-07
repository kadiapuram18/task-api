import prisma from '../config/db.js';

export async function create(taskData) {
  return prisma.task.create({ data: taskData });
}

export async function findAll(completed) {
  const where = {};
  if (completed !== undefined) {
    where.completed = completed;
  }
  return prisma.task.findMany({ where });
}

export async function findByUserId(userId, completed) {
  const where = { userId };
  if (completed !== undefined) {
    where.completed = completed;
  }
  return prisma.task.findMany({ where });
}

export async function findById(id) {
  return prisma.task.findUnique({ where: { id } });
}

export async function updateById(id, updatedData) {
  try {
    return await prisma.task.update({ where: { id }, data: updatedData });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function deleteById(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}