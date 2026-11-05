import prisma from '../config/db.js';

/**
 * Creates a new task record in the database.
 * @param {Object} taskData
 * @returns {Promise<Object>} The created task record.
 */
export async function create(taskData) {
  return prisma.task.create({ data: taskData });
}

/**
 * Retrieves all task records from the database.
 * @returns {Promise<Array>} List of all tasks.
 */
export async function findAll() {
  return prisma.task.findMany();
}

/**
 * Retrieves task records for a specific user,
 * optionally filtered by completion status.
 * @param {number} userId - The user ID.
 * @param {boolean} [completed] - Optional filter: true, false, or undefined for all.
 * @returns {Promise<Array>} List of tasks for the specified user.
 */
export async function findByUserId(userId, completed) {
  const where = { userId };
  if (completed !== undefined) {
    where.completed = completed;
  }
  return prisma.task.findMany({ where });
}

/**
 * Finds a single task record by its unique primary key.
 * @param {number} id - The task ID.
 * @returns {Promise<Object|null>} The task record or null if not found.
 */
export async function findById(id) {
  return prisma.task.findUnique({ where: { id } });
}

/**
 * Updates an existing task record by its unique primary key.
 * @param {number} id - The task ID.
 * @param {Object} updatedData
 * @returns {Promise<Object|null>} The updated task record or null if not found.
 */
export async function updateById(id, updatedData) {
  try {
    return await prisma.task.update({ where: { id }, data: updatedData });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

/**
 * Deletes a task record by its unique primary key.
 * @param {number} id - The task ID.
 * @returns {Promise<Object|null>} The deleted task record or null if not found.
 */
export async function deleteById(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}