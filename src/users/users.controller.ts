import httpStatus from 'http-status';
import {pick} from '../utils/pick';
import ApiError from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';
import { usersService } from './users.service';

const createUser = catchAsync(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await usersService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await usersService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await usersService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await usersService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const usersController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
