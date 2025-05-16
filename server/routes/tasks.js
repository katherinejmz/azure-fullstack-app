import express from 'express';
import { 
  getTasks, 
  getUserTasks, 
  getTaskById,
  createTask, 
  updateTask, 
  deleteTask 
} from '../db/index.js';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
  try {
    const tasks = getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's tasks
router.get('/my-tasks', (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = getUserTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single task
router.get('/:id', (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a task
router.post('/', (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }
    
    const task = createTask(title, description, userId);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updates = req.body;
    const userId = req.user.id;
    
    // Get existing task
    const existingTask = getTaskById(taskId);
    
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Update task
    const updatedTask = updateTask(taskId, updates);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const userId = req.user.id;
    
    // Get existing task
    const existingTask = getTaskById(taskId);
    
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Delete task
    deleteTask(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;