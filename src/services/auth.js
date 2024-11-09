import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/user.js';
import { env } from '../utils/env.js';

export const registerUser = async (payload) => {
  const email = await UsersCollection.findOne({ email: payload.email });

  if (email) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '23h',
    },
  );

  await UsersCollection.findByIdAndUpdate(user._id, { token });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

export const logoutUser = async (payload) => {
  await UsersCollection.findByIdAndUpdate(payload._id, { token: '' });
};

export const getUserInfo = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token: user.token,
  };
};
