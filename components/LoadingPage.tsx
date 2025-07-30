'use client';

import React, { useEffect } from 'react';
import { Loader2, Train, Languages } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import Image from 'next/image';

interface LoadingPageProps {
  onComplete: () => void;
}

export function LoadingPage({ onComplete }: LoadingPageProps) {
  const { language, setLanguage } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Augmenté à 3s pour laisser le temps de changer la langue

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex flex-col text-white relative">
      {/* Language Selector */}
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
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Logo EDR */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white">
            <Image
              src="/edr-logo.jpeg"
              alt="EDR Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-wide">EDR</h1>
            <p className="text-green-100 text-xl font-medium">Éthio-Djibouti Railway</p>
            <p className="text-green-200 text-base mt-2">
              {language === 'fr' 
                ? 'Chemin de fer Éthio-Djiboutien' 
                : 'Ethiopian-Djibouti Railway'
              }
            </p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-xl font-medium">
            {language === 'fr' ? 'Chargement...' : 'Loading...'}
          </p>
        </div>

        {/* Railway Track Animation */}
        <div className="w-80 h-6 bg-green-700 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white transform -translate-y-1/2 opacity-70"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2 opacity-40"></div>
          {/* Train animation */}
          <div className="absolute top-1 left-0 w-16 h-4 bg-white rounded-sm animate-pulse shadow-lg">
            <Train className="w-3 h-3 text-green-600 mt-0.5 ml-6" />
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center max-w-md px-4">
          <p className="text-green-100 text-lg leading-relaxed">
            {language === 'fr' 
              ? "Connectant l'Éthiopie au port de Djibouti"
              : "Connecting Ethiopia to the Port of Djibouti"
            }
          </p>
          <p className="text-green-200 text-sm mt-2">
            {language === 'fr'
              ? "Votre voyage commence ici"
              : "Your journey starts here"
            }
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-green-100 text-sm p-4">
        <p>&copy; 2025 EDR - {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}</p>
      </div>
    </div>
  );
} 