import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getTasks = asyncHandler(async (req, res) => {
  const {search, status, priority} = req.query;
  const query = { user: req.user.id };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];  
  }
  if (status) {
    query.status = status;
  }
  if (priority) {
    query.priority = priority;
  }
  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await new Task({
    ...req.body,
    user : req.user.id,
  });
  await task.save();
  res.status(201).json(task);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById({
    _id: req.params.id,
    user: req.user.id
  });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate({
    _id: req.params.id,
    user: req.user.id
  }, req.body, { new: true });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete({
    _id: req.params.id,
    user: req.user.id
  });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json({ message: 'Task deleted successfully' });
});
