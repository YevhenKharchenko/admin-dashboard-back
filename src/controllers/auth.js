import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      ...user,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user);

  res.json({
    status: 200,
    message: 'Successfully logged out an user!',
  });
};

export const getUserInfoController = async (req, res) => {
  const user = await getUserInfo(req.user);

  res.json({
    status: 200,
    data: {
      ...user,
    },
  });
};
