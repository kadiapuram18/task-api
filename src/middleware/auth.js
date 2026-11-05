import jwt from 'jsonwebtoken';
import { findTaskById } from '../services/taskService.js';

function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError(401, 'Not authenticated. Please provide a token.'));
  }

  const [scheme, token] = authHeader.trim().split(/\s+/);
  if (scheme !== 'Bearer' || !token) {
    return next(createError(401, 'Not authenticated. Malformed authorization header.'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (error) {
    return next(createError(401, 'Not authenticated. Invalid or expired token.'));
  }
}

export async function requireTaskOwnership(req, res, next) {
  const id = parseInt(req.params.id, 10);
  const task = await findTaskById(id);

  if (req.user.role !== 'ADMIN' && task.userId !== req.user.id) {
    return next(createError(403, 'Forbidden: insufficient permission.'));
  }

  req.task = task;
  return next();
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return next(createError(403, 'Forbidden: insufficient permission.'));
  }
  return next();
}