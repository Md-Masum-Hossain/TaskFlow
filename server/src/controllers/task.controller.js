import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) {
    return res.status(404).json({ message: 'No tasks found' });
  }
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  console.log("Creating task for user:", req.user);
  const task = await new Task({
    ...req.body,
    user : req.user.id,
  });
  await task.save();
  res.status(201).json(task);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json({ message: 'Task deleted successfully' });
});
