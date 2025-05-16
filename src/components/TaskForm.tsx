import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

type FormData = {
  title: string;
  description: string;
};

const TaskForm: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { addTask, loading, error } = useTaskStore();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    await addTask(data.title, data.description);
    reset();
    setExpanded(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center mb-3">
          <div className="mr-3 text-blue-500">
            <PlusCircle size={20} />
          </div>
          <input
            type="text"
            placeholder="Add a new task..."
            className={`w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 px-1 transition-colors
              ${errors.title ? 'border-red-500' : ''}`}
            {...register('title', { 
              required: 'Task title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' },
              maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
            })}
            onFocus={() => setExpanded(true)}
          />
        </div>
        
        {errors.title && (
          <p className="text-red-500 text-xs mt-1 ml-8">{errors.title.message}</p>
        )}
        
        {expanded && (
          <>
            <div className="ml-8 mb-3">
              <textarea
                placeholder="Add a description (optional)"
                className="w-full border border-gray-200 rounded-md p-2 text-sm resize-none h-20 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                {...register('description', { 
                  maxLength: { value: 500, message: 'Description must not exceed 500 characters' }
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setExpanded(false);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-blue-500 transition-colors disabled:opacity-70"
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
            
            {error && (
              <div className="mt-2 text-red-500 text-xs">
                {error}
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default TaskForm;