'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Ticket, 
  Settings, 
  User, 
  LogOut, 
  Languages,
  DollarSign,
  X
} from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen, t, user, setUser, language, setLanguage, currency, setCurrency } = useApp();

  const menuItems = [
    { key: 'home', icon: Home, label: t.home, color: 'text-green-600' },
    { key: 'tickets', icon: Ticket, label: t.myTickets, color: 'text-blue-600' },
    { key: 'settings', icon: Settings, label: t.settings, color: 'text-purple-600' },
    { key: 'profile', icon: User, label: t.profile, color: 'text-indigo-600' },
  ];

  const handleLogout = () => {
    setUser(null);
    onNavigate('login');
    setSidebarOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'DJF' : 'USD');
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-600 to-green-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">EDR</span>
            </div>
            <div>
              <h2 className="font-semibold text-white">EDR</h2>
              <p className="text-sm text-green-100">Éthio-Djibouti Railway</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:bg-green-500"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                currentPage === item.key 
                  ? 'bg-green-50 border-r-4 border-green-600 text-green-700' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <item.icon 
                className={`w-5 h-5 ${
                  currentPage === item.key ? item.color : 'text-gray-500'
                }`} 
              />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="space-y-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Languages className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{t.language}</span>
              </div>
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Currency Toggle */}
            <button
              onClick={toggleCurrency}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">{t.currency}</span>
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {currency}
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">{t.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 