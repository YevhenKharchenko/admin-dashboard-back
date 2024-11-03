import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/user.js';
import { env } from '../utils/env.js';

export const authenticate = async (req, _, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  try {
    const decoded = jwt.verify(token, env('JWT_SECRET'));
    const user = await UsersCollection.findById(decoded.id);

    if (!user || token !== user.token) {
      return next(createHttpError(401, 'Invalid or expired token'));
    }

    req.user = user;
    next();
  } catch {
    return next(createHttpError(401, 'Token verification failed'));
  }
};
