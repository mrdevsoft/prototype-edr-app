'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Train, Languages } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import Image from 'next/image';

interface SplashPageProps {
  onContinue: () => void;
}

export function SplashPage({ onContinue }: SplashPageProps) {
  const { language, setLanguage, t } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex flex-col">
      {/* Header with Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center space-x-2">
          <Languages className="w-5 h-5 text-white" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
            className="bg-white bg-opacity-90 border border-white text-gray-800 rounded px-3 py-1 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-white px-8">
        <div className="text-center space-y-8 max-w-md">
          {/* Logo EDR */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white">
              <Image
                src="/edr-logo.jpeg"
                alt="EDR Logo"
                width={88}
                height={88}
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-wide">EDR</h1>
              <p className="text-green-100 text-lg font-medium">Éthio-Djibouti Railway</p>
              <p className="text-green-200 text-sm mt-1">
                {language === 'fr' 
                  ? 'Chemin de fer Éthio-Djiboutien' 
                  : 'Ethiopian-Djibouti Railway'
                }
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.welcomeMessage}</h2>
            <p className="text-green-100 text-lg leading-relaxed">
              {language === 'fr' 
                ? "Réservez vos billets de train facilement et voyagez confortablement sur la ligne Éthio-Djibouti."
                : "Book your train tickets easily and travel comfortably on the Ethio-Djibouti line."
              }
            </p>
          </div>

          {/* Railway Track Illustration */}
          <div className="flex justify-center py-8">
            <div className="w-48 h-4 bg-green-700 rounded-full relative overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2 opacity-50"></div>
              {/* Train moving animation */}
              <div className="absolute top-0 left-0 w-8 h-4 bg-white rounded-sm animate-pulse transform transition-all duration-3000">
                <Train className="w-3 h-3 text-green-600 mt-0.5 ml-2.5" />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button 
            onClick={onContinue}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 hover:text-black py-4 text-xl font-extrabold rounded-xl shadow-2xl border-4 border-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            size="lg"
            style={{ 
              backgroundColor: '#ffffff',
              color: '#1f2937',
              fontWeight: '900'
            }}
          >
            <span style={{ color: '#1f2937', fontWeight: '900' }}>
              {t.continue}
            </span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-green-100 text-sm p-4">
        <p>&copy; 2025 EDR - {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}</p>
      </div>
    </div>
  );
} 