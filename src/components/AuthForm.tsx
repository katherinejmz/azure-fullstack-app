import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import { UserCircle } from 'lucide-react';

type FormData = {
  pseudo: string;
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser, error, loading, clearError } = useAuthStore();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const onSubmit = async (data: FormData) => {
    if (isLogin) {
      await login(data.pseudo);
    } else {
      await registerUser(data.pseudo);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transition-all duration-300">
      <div className="flex flex-col items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full mb-4">
          <UserCircle className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isLogin ? 'Welcome Back' : 'Join Us'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isLogin 
            ? 'Sign in to access your tasks' 
            : 'Create a new account to get started'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="pseudo"
            type="text"
            placeholder="Enter your username"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors
              ${errors.pseudo ? 'border-red-500' : 'border-gray-300'}`}
            {...register('pseudo', { 
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
              maxLength: { value: 20, message: 'Username must not exceed 20 characters' }
            })}
          />
          {errors.pseudo && (
            <p className="mt-1 text-sm text-red-600">{errors.pseudo.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md 
            transition-colors duration-300 font-medium focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={toggleAuthMode}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;