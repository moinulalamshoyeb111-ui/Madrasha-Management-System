import React from 'react';
import { View } from '../types';

interface HeaderProps {
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
    return (
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700">{currentView}</h2>
            <div className="flex items-center space-x-6">
                <button title="Notifications" className="relative text-gray-500 hover:text-teal-600 focus:outline-none">
                    <i className="fas fa-bell text-xl"></i>
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
                </button>
                <button title="Settings" className="text-gray-500 hover:text-teal-600 focus:outline-none">
                    <i className="fas fa-cog text-xl"></i>
                </button>
                 <button title="Logout" className="text-gray-500 hover:text-teal-600 focus:outline-none">
                    <i className="fas fa-sign-out-alt text-xl"></i>
                </button>
            </div>
        </header>
    );
};

export default Header;