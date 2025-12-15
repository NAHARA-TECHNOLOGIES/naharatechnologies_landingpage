'use client';

import React from 'react';
import { User, FileText, Users, Plus } from 'lucide-react'; // removed Settings

interface DashSiderProps {
  handleTabChange: (tab: string) => void;
  isAdmin: boolean;
  activeTab: string;
  hideOverview?: boolean; // new optional prop
}

const DashSider: React.FC<DashSiderProps> = ({ handleTabChange, isAdmin, activeTab, hideOverview }) => {
  const menuItems = [
    { label: 'Overview', tab: 'dash', icon: <FileText size={18} /> },
    { label: 'Profile', tab: 'profile', icon: <User size={18} /> },
    { label: 'Posts', tab: 'posts', icon: <FileText size={18} /> },
    { label: 'Users', tab: 'users', icon: <Users size={18} /> },
  ];

  // hide Overview if hideOverview is true
  const filteredItems = hideOverview
    ? menuItems.filter(item => item.tab !== 'dash')
    : menuItems;

  if (isAdmin) {
    filteredItems.push({ label: 'Create Post', tab: 'createpost', icon: <Plus size={18} /> });
  }

  return (
    <nav className="flex flex-col h-full px-3 py-6 overflow-y-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>

      <ul className="flex flex-col gap-2">
        {filteredItems.map((item) => (
          <li key={item.tab}>
            <button
              onClick={() => handleTabChange(item.tab)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left transition 
                ${
                  activeTab === item.tab
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashSider;
