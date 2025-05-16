import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByPseudo, createUser } from '../db/index.js';

const router = express.Router();
const JWT_SECRET = 'your-secret-key'; // In production, use environment variables

// Login route
router.post('/login', (req, res) => {
  try {
    const { pseudo } = req.body;
    
    if (!pseudo || pseudo.trim() === '') {
      return res.status(400).json({ message: 'Username is required' });
    }
    
    // Check if user exists
    let user = getUserByPseudo(pseudo);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, pseudo: user.pseudo },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      user: { id: user.id, pseudo: user.pseudo },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route
router.post('/register', (req, res) => {
  try {
    const { pseudo } = req.body;
    
    if (!pseudo || pseudo.trim() === '') {
      return res.status(400).json({ message: 'Username is required' });
    }
    
    if (pseudo.length < 3 || pseudo.length > 20) {
      return res.status(400).json({ 
        message: 'Username must be between 3 and 20 characters' 
      });
    }
    
    // Check if username already exists
    const existingUser = getUserByPseudo(pseudo);
    
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    
    // Create new user
    const user = createUser(pseudo);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, pseudo: user.pseudo },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, pseudo: user.pseudo },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;