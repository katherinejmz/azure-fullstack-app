# TaskCollab - Collaborative Task Manager

A collaborative task management application that allows multiple users to create, manage, and track tasks together.

## Features

- Simple user authentication with pseudonyms
- Create tasks with title and description
- View all tasks from all users
- Mark tasks as complete or incomplete
- Filter tasks by ownership and completion status
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: SQLite (via better-sqlite3)
- **State Management**: Zustand
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Notifications**: Sonner

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start both frontend and backend in development mode:
   ```
   npm run dev:full
   ```

3. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with a username
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/my-tasks` - Get current user's tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/store` - Zustand state management
  - `/types` - TypeScript type definitions
- `/server` - Backend Express API
  - `/db` - Database operations
  - `/routes` - API route handlers
  - `/middlewares` - Express middleware

## Future Improvements

- Real-time updates with WebSockets
- User avatars and profiles
- Task categories and priorities
- Due dates and reminders
- Team/project grouping for tasks