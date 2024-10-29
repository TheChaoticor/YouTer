import React from 'react';
import { LogIn, Youtube, LogOut } from 'lucide-react';

type NavbarProps = {
  isCreator: boolean;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
};

function Navbar({ isCreator, isAuthenticated, onLoginClick, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Youtube className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold">YT Approval Hub</span>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <span className={`font-medium ${isCreator ? 'text-green-600' : 'text-blue-600'}`}>
                {isCreator ? 'Creator Dashboard' : 'Editor Dashboard'}
              </span>
            )}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;