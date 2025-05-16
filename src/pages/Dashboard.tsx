import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Toaster } from 'sonner';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    document.title = 'TaskCollab - Dashboard';
  }, []);
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Toaster position="top-right" />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage and track tasks collaboratively
              </p>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <TaskForm />
            <TaskList currentUser={user} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            TaskCollab - A collaborative task manager
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;