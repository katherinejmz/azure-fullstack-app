import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { useTaskStore } from '../store/taskStore';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskStore();

  const handleToggle = () => {
    toggleTaskCompletion(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const getRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div 
      className={`group relative p-4 mb-3 border rounded-lg shadow-sm transition-all duration-200
        ${task.done 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow'}`}
    >
      <div className="flex items-start gap-3">
        <button 
          onClick={handleToggle}
          className="mt-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
          aria-label={task.done ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.done ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 
              className={`text-base font-medium ${
                task.done ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            <button
              onClick={handleDelete}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${
              task.done ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
            <span className="flex items-center">
              {/* User icon */}
              <span className="inline-block h-4 w-4 rounded-full bg-blue-100 text-blue-500 mr-1 flex items-center justify-center text-[10px] font-medium">
                {task.userPseudo.charAt(0).toUpperCase()}
              </span>
              {task.userPseudo}
            </span>
            <span>•</span>
            <span>{getRelativeTime(task.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;