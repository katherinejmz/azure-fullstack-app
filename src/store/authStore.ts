import { create } from 'zustand';
import axios from 'axios';
import { AuthState } from '../types';

const API_URL = 'http://localhost:3001/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (pseudo: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/login`, { pseudo });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  },

  register: async (pseudo: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/register`, { pseudo });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null })
}));

// Initialize auth state from localStorage on app load
export const initAuthStore = () => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  
  if (token && userJson) {
    try {
      const user = JSON.parse(userJson);
      useAuthStore.setState({ user, isAuthenticated: true });
    } catch (error) {
      // Invalid user JSON, clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
};