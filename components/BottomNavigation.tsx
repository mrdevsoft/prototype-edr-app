'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Home, Search, Ticket, User, Bell } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const { t } = useApp();

  const tabs = [
    {
      key: 'home',
      icon: Home,
      label: t.home,
      color: 'text-green-600'
    },
    {
      key: 'search',
      icon: Search,
      label: 'Rechercher',
      color: 'text-blue-600'
    },
    {
      key: 'tickets',
      icon: Ticket,
      label: t.tickets,
      color: 'text-purple-600'
    },
    {
      key: 'notifications',
      icon: Bell,
      label: 'Notifications',
      color: 'text-orange-600'
    },
    {
      key: 'profile',
      icon: User,
      label: t.profile,
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.key;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                className={`w-6 h-6 ${
                  isActive ? tab.color : 'text-gray-400'
                }`} 
              />
              <span 
                className={`text-xs font-medium ${
                  isActive ? tab.color : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 