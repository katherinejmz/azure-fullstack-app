import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskItem from './TaskItem';
import { CheckCircle, AlertCircle, Filter } from 'lucide-react';
import { User } from '../types';

interface TaskListProps {
  currentUser: User;
}

const TaskList: React.FC<TaskListProps> = ({ currentUser }) => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();
  const [filter, setFilter] = useState<'all' | 'mine' | 'completed' | 'pending'>('all');
  
  useEffect(() => {
    fetchTasks();
    // Set up polling for task updates
    const intervalId = setInterval(() => {
      fetchTasks();
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [fetchTasks]);
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'mine') return task.userId === currentUser.id;
    if (filter === 'completed') return task.done;
    if (filter === 'pending') return !task.done;
    return true;
  });
  
  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Error loading tasks: {error}</span>
        </div>
      </div>
    );
  }
  
  if (filteredTasks.length === 0) {
    return (
      <div>
        <div className="flex items-center mb-4 space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md text-sm p-1"
          >
            <option value="all">All Tasks</option>
            <option value="mine">My Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <CheckCircle className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' 
              ? 'Get started by creating your first task above.' 
              : `No ${filter === 'mine' ? 'your' : filter} tasks found.`}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
        </h2>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md text-sm p-1"
          >
            <option value="all">All Tasks</option>
            <option value="mine">My Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      <div>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;