export interface User {
  id: number;
  pseudo: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  userId: number;
  userPseudo: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (pseudo: string) => Promise<void>;
  register: (pseudo: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string, description?: string) => Promise<void>;
  toggleTaskCompletion: (taskId: number) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  fetchTasks: () => Promise<void>;
  clearError: () => void;
}