import React from 'react';
import { useAuthStore } from '../store/authStore';
import { CheckSquare, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <CheckSquare className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">TaskCollab</span>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center">
              <div className="hidden md:flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-sm">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{user.pseudo}</span>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <span className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="flex md:hidden">
                <button
                  onClick={logout}
                  className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;