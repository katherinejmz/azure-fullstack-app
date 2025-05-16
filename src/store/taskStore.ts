import { create } from 'zustand';
import axios from 'axios';
import { TasksState } from '../types';

const API_URL = 'http://localhost:3001/api';

export const useTaskStore = create<TasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      if (!token) {
        set({ loading: false, error: 'Authentication required' });
        return;
      }

      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch tasks' 
      });
    }
  },

  addTask: async (title: string, description?: string) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      if (!token) {
        set({ loading: false, error: 'Authentication required' });
        return;
      }

      const response = await axios.post(
        `${API_URL}/tasks`, 
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const newTask = response.data;
      set({ 
        tasks: [...get().tasks, newTask],
        loading: false 
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to add task' 
      });
    }
  },

  toggleTaskCompletion: async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      const task = get().tasks.find(t => t.id === taskId);
      
      if (!token || !task) return;
      
      // Optimistic update
      set({
        tasks: get().tasks.map(t => 
          t.id === taskId ? { ...t, done: !t.done } : t
        )
      });

      await axios.put(
        `${API_URL}/tasks/${taskId}`, 
        { done: !task.done },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      // Revert on failure
      await get().fetchTasks();
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update task' 
      });
    }
  },

  deleteTask: async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      // Optimistic update
      set({
        tasks: get().tasks.filter(t => t.id !== taskId)
      });

      await axios.delete(
        `${API_URL}/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      // Revert on failure
      await get().fetchTasks();
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete task' 
      });
    }
  },

  clearError: () => set({ error: null })
}));