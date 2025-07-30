'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.fr;
  
  // Currency  
  currency: 'USD' | 'DJF';
  setCurrency: (curr: 'USD' | 'DJF') => void;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  
  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultUser: User = {
  id: '1',
  name: 'Abdelnassir Haroun',
  email: 'abdelnassir@example.com',
  phone: '77777850'
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [currency, setCurrency] = useState<'USD' | 'DJF'>('USD');
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const savedCurrency = localStorage.getItem('currency') as 'USD' | 'DJF';
    const savedUser = localStorage.getItem('user');

    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value: AppContextType = {
    language,
    setLanguage,
    t: translations[language],
    currency,
    setCurrency,
    user,
    setUser,
    isAuthenticated: !!user,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Helper function for default login
export function useDefaultLogin() {
  const { setUser } = useApp();
  
  return () => {
    setUser(defaultUser);
  };
} 