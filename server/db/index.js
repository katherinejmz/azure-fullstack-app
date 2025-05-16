import BetterSqlite3 from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const dbPath = join(__dirname, '../../taskcollab.db');

// Initialize database connection
export const getDb = () => {
  return new BetterSqlite3(dbPath);
};

// Set up database schema
export const setupDatabase = () => {
  const db = getDb();
  
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pseudo TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      done BOOLEAN DEFAULT 0,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
  
  db.close();
  console.log('Database setup complete');
};

// User operations
export const getUserByPseudo = (pseudo) => {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE pseudo = ?').get(pseudo);
  db.close();
  return user;
};

export const createUser = (pseudo) => {
  const db = getDb();
  const result = db.prepare('INSERT INTO users (pseudo) VALUES (?)').run(pseudo);
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  db.close();
  return user;
};

// Task operations
export const getTasks = () => {
  const db = getDb();
  const tasks = db.prepare(`
    SELECT 
      t.id, 
      t.title, 
      t.description, 
      t.done, 
      t.user_id as userId, 
      u.pseudo as userPseudo, 
      t.created_at as createdAt 
    FROM tasks t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.created_at DESC
  `).all();
  db.close();
  return tasks;
};

export const getUserTasks = (userId) => {
  const db = getDb();
  const tasks = db.prepare(`
    SELECT 
      t.id, 
      t.title, 
      t.description, 
      t.done, 
      t.user_id as userId, 
      u.pseudo as userPseudo, 
      t.created_at as createdAt 
    FROM tasks t
    JOIN users u ON t.user_id = u.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC
  `).all(userId);
  db.close();
  return tasks;
};

export const getTaskById = (taskId) => {
  const db = getDb();
  const task = db.prepare(`
    SELECT 
      t.id, 
      t.title, 
      t.description, 
      t.done, 
      t.user_id as userId, 
      u.pseudo as userPseudo, 
      t.created_at as createdAt 
    FROM tasks t
    JOIN users u ON t.user_id = u.id
    WHERE t.id = ?
  `).get(taskId);
  db.close();
  return task;
};

export const createTask = (title, description, userId) => {
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)'
  ).run(title, description || null, userId);
  
  const task = getTaskById(result.lastInsertRowid);
  db.close();
  return task;
};

export const updateTask = (taskId, data) => {
  const db = getDb();
  const fields = Object.keys(data)
    .filter(key => key !== 'id')
    .map(key => `${key === 'userId' ? 'user_id' : key} = ?`)
    .join(', ');
    
  const values = Object.keys(data)
    .filter(key => key !== 'id')
    .map(key => data[key]);
    
  if (fields && values.length) {
    const stmt = db.prepare(`UPDATE tasks SET ${fields} WHERE id = ?`);
    stmt.run(...values, taskId);
  }
  
  const task = getTaskById(taskId);
  db.close();
  return task;
};

export const deleteTask = (taskId) => {
  const db = getDb();
  db.prepare('DELETE FROM tasks WHERE id = ?').run(taskId);
  db.close();
  return { id: taskId };
};