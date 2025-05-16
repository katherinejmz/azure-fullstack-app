import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthForm from '../components/AuthForm';
import { CheckSquare } from 'lucide-react';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    document.title = 'TaskCollab - Login';
  }, []);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="flex items-center justify-center">
          <CheckSquare className="h-10 w-10 text-blue-600" />
          <h1 className="ml-2 text-3xl font-bold text-gray-900">TaskCollab</h1>
        </div>
        <h2 className="mt-2 text-gray-600">
          A collaborative task manager for teams
        </h2>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm />
        
        <p className="mt-6 text-center text-sm text-gray-500">
          A simple task manager demo application.
          <br />
          Register with any username to get started!
        </p>
      </div>
    </div>
  );
};

export default Login;