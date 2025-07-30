'use client';

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { LoadingPage } from '@/components/LoadingPage';
import { SplashPage } from '@/components/SplashPage';
import { LoginPage } from '@/components/LoginPage';
import { HomePage } from '@/components/HomePage';
import { TicketsPage } from '@/components/TicketsPage';
import { PaymentPage } from '@/components/PaymentPage';
import { NotificationsPage } from '@/components/NotificationsPage';
import { BaggageScanPage } from '@/components/BaggageScanPage';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Stepper } from '@/components/Stepper';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

type AppState = 'loading' | 'splash' | 'login' | 'otp' | 'home' | 'tickets' | 'settings' | 'profile' | 'payment' | 'search-results' | 'seat-selection' | 'notifications' | 'search' | 'baggage-tracking' | 'baggage-scan';

// Define types for search data
interface SearchData {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  tripType?: 'oneWay' | 'roundTrip';
  selectedTrip?: {
    id: number;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    available: number;
    type: string;
  };
  selectedSeats?: string[];
}

function AppContent() {
  const { isAuthenticated, t } = useApp();
  const [currentState, setCurrentState] = useState<AppState>('loading');
  const [searchData, setSearchData] = useState<SearchData | undefined>(undefined);

  // Handle navigation with type conversion
  const navigate = (page: string, data?: SearchData) => {
    const validStates: AppState[] = ['loading', 'splash', 'login', 'otp', 'home', 'tickets', 'settings', 'profile', 'payment', 'search-results', 'seat-selection', 'notifications', 'search', 'baggage-tracking', 'baggage-scan'];
    if (validStates.includes(page as AppState)) {
      setCurrentState(page as AppState);
      if (data) {
        setSearchData(data);
      }
    }
  };

  // Handle authentication flow
  useEffect(() => {
    if (currentState === 'home' && !isAuthenticated) {
      setCurrentState('login');
    }
  }, [currentState, isAuthenticated]);

  // Get current step for stepper
  const getCurrentStep = () => {
    switch (currentState) {
      case 'search-results': return 1;
      case 'seat-selection': return 2;
      case 'payment': return 3;
      default: return 1;
    }
  };

  const bookingSteps = [
    t.language === 'fr' ? 'Recherche' : 'Search',
    t.language === 'fr' ? 'Sièges' : 'Seats',
    t.language === 'fr' ? 'Paiement' : 'Payment'
  ];

  const renderCurrentPage = () => {
    switch (currentState) {
      case 'loading':
        return <LoadingPage onComplete={() => setCurrentState('splash')} />;
      
      case 'splash':
        return <SplashPage onContinue={() => setCurrentState('login')} />;
      
      case 'login':
        return (
          <LoginPage 
            onLogin={() => setCurrentState('home')}
            onSignup={() => setCurrentState('otp')}
          />
        );
      
      case 'otp':
        return <OTPPage onVerified={() => setCurrentState('home')} />;
      
      case 'home':
        return <HomePage onNavigate={navigate} />;
      
      case 'search':
        return <HomePage onNavigate={navigate} />;
      
      case 'tickets':
        return <TicketsPage onNavigate={navigate} />;
      
      case 'notifications':
        return <NotificationsPage onNavigate={navigate} />;
      
      case 'baggage-scan':
        return <BaggageScanPage onNavigate={navigate} />;
      
      case 'baggage-tracking':
        return <BaggageTrackingPage onNavigate={navigate} />;
      
      case 'search-results':
        return (
          <div>
            <Stepper currentStep={getCurrentStep()} steps={bookingSteps} />
            <SearchResultsPage onNavigate={navigate} searchData={searchData} />
          </div>
        );
      
      case 'seat-selection':
        return (
          <div>
            <Stepper currentStep={getCurrentStep()} steps={bookingSteps} />
            <SeatSelectionPage onNavigate={navigate} searchData={searchData} />
          </div>
        );
      
      case 'payment':
        return (
          <div>
            <Stepper currentStep={getCurrentStep()} steps={bookingSteps} />
            <PaymentPage onNavigate={navigate} searchData={searchData} />
          </div>
        );
      
      case 'settings':
        return <SettingsPage onNavigate={navigate} />;
      
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  // Pages that should show bottom navigation
  const showBottomNav = isAuthenticated && ['home', 'search', 'tickets', 'notifications', 'profile'].includes(currentState);

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
      
      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavigation 
          currentPage={currentState}
          onNavigate={navigate}
        />
      )}
      
      {/* Sidebar */}
      {isAuthenticated && (
        <Sidebar 
          onNavigate={navigate} 
          currentPage={currentState}
        />
      )}
    </div>
  );
}

// Page de résultats de recherche avec option de filtrage
function SearchResultsPage({ onNavigate, searchData }: { onNavigate: (page: string, data?: SearchData) => void, searchData: SearchData | undefined }) {
  const { t, currency } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock search results
  const results = [
    {
      id: 1,
      from: searchData?.from || t.stations.djibouti,
      to: searchData?.to || t.stations.direDawa,
      departure: '08:00',
      arrival: '20:00',
      duration: '12h',
      price: 25,
      available: 45,
      type: 'Express'
    },
    {
      id: 2,
      from: searchData?.from || t.stations.djibouti,
      to: searchData?.to || t.stations.direDawa,
      departure: '14:30',
      arrival: '02:30',
      duration: '12h',
      price: 22,
      available: 32,
      type: 'Standard'
    },
    {
      id: 3,
      from: searchData?.from || t.stations.djibouti,
      to: searchData?.to || t.stations.direDawa,
      departure: '22:00',
      arrival: '10:00',
      duration: '12h',
      price: 28,
      available: 18,
      type: 'Couchettes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">
              {results.length} {results.length === 1 ? t.tripFound : t.tripsFound}
            </h1>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Prix</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Croissant</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Décroissant</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Type</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Express</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Standard</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Couchettes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-6 space-y-4">
        {results.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{trip.departure}</p>
                  <p className="text-sm text-gray-500">{trip.from}</p>
                </div>
                
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{trip.duration}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{trip.arrival}</p>
                  <p className="text-sm text-gray-500">{trip.to}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {trip.type}
                </span>
                <span className="text-sm text-gray-500">
                  {trip.available} places disponibles
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {currency === 'USD' ? `$${trip.price}` : `${trip.price * 177} DJF`}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('seat-selection', { ...searchData, selectedTrip: trip })}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Sélectionner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page de sélection de sièges
function SeatSelectionPage({ onNavigate, searchData }: { onNavigate: (page: string, data?: SearchData) => void, searchData: SearchData | undefined }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Mock seat layout
  const generateSeats = () => {
    const seats = [];
    const rows = 15;
    const seatsPerRow = 4;
    
    // Sièges occupés prédéfinis pour éviter les problèmes d'hydratation
    const occupiedSeats = new Set([
      '1A', '1B', '2C', '3D', '4A', '5B', '6C', '7D', 
      '8A', '9B', '10C', '11D', '12A', '13B', '14C'
    ]);
    
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = `${row}${String.fromCharCode(64 + seat)}`;
        const isOccupied = occupiedSeats.has(seatNumber);
        rowSeats.push({
          number: seatNumber,
          isOccupied,
          isSelected: selectedSeats.includes(seatNumber)
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const seats = generateSeats();
  
  const toggleSeat = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else if (selectedSeats.length < (searchData?.passengers || 1)) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const canProceed = selectedSeats.length === (searchData?.passengers || 1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('search-results', searchData || undefined)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">Sélection des sièges</h1>
            <p className="text-sm text-gray-500">
              {selectedSeats.length}/{searchData?.passengers || 1} sélectionné(s)
            </p>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Légende */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-semibold mb-3">Légende</h3>
          <div className="flex justify-around text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 rounded border-2"></div>
              <span>Libre</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded border-2"></div>
              <span>Sélectionné</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded border-2"></div>
              <span>Occupé</span>
            </div>
          </div>
        </div>

        {/* Plan des sièges */}
        <div className="bg-white rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
              🚂 Sens de la marche
            </div>
          </div>
          
          <div className="space-y-2 max-w-xs mx-auto">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-2">
                <div className="flex space-x-1">
                  {row.slice(0, 2).map((seat) => (
                    <button
                      key={seat.number}
                      onClick={() => !seat.isOccupied && toggleSeat(seat.number)}
                      disabled={seat.isOccupied}
                      className={`w-8 h-8 rounded border-2 text-xs font-medium transition-colors ${
                        seat.isOccupied
                          ? 'bg-red-500 border-red-600 text-white cursor-not-allowed'
                          : seat.isSelected
                          ? 'bg-green-600 border-green-700 text-white'
                          : 'bg-gray-200 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
                
                <div className="w-6"></div>
                
                <div className="flex space-x-1">
                  {row.slice(2, 4).map((seat) => (
                    <button
                      key={seat.number}
                      onClick={() => !seat.isOccupied && toggleSeat(seat.number)}
                      disabled={seat.isOccupied}
                      className={`w-8 h-8 rounded border-2 text-xs font-medium transition-colors ${
                        seat.isOccupied
                          ? 'bg-red-500 border-red-600 text-white cursor-not-allowed'
                          : seat.isSelected
                          ? 'bg-green-600 border-green-700 text-white'
                          : 'bg-gray-200 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton de confirmation */}
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4">
          <button
            onClick={() => onNavigate('payment', { ...searchData, selectedSeats })}
            disabled={!canProceed}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              canProceed
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canProceed 
              ? `Continuer vers le paiement (${selectedSeats.join(', ')})`
              : `Sélectionnez ${(searchData?.passengers || 1) - selectedSeats.length} siège(s) de plus`
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// Page de paramètres
function SettingsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, language, setLanguage, currency, setCurrency, user } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">{t.settings}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">{t.profileManagement}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{user?.name || 'Abdelnassir Haroun'}</h3>
                <p className="text-gray-500">{user?.email || 'abdelnassir@example.com'}</p>
                <p className="text-gray-500">{user?.phone || '77777850'}</p>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Préférences</h2>
          <div className="space-y-4">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="font-medium">{t.language}</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Currency */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="font-medium">{t.currency}</span>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'DJF')}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="USD">USD ($)</option>
                <option value="DJF">DJF (Franc djiboutien)</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{t.notifications}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">{t.paymentMethods}</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">WF</span>
                </div>
                <span className="font-medium">Waafi Money</span>
              </div>
              <span className="text-green-600 text-sm">Connecté</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xs">DM</span>
                </div>
                <span className="font-medium">D-Money</span>
              </div>
              <button className="text-gray-400 text-sm">Ajouter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page de profil
function ProfilePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, user, setUser } = useApp();
  const [name, setName] = useState(user?.name || 'Abdelnassir Haroun');
  const [email, setEmail] = useState(user?.email || 'abdelnassir@example.com');
  const [phone, setPhone] = useState(user?.phone || '77777850');

  const handleSave = () => {
    setUser({
      id: user?.id || '1',
      name,
      email,
      phone
    });
    onNavigate('settings');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">{t.profile}</h1>
          </div>
          
          <button
            onClick={handleSave}
            className="text-green-600 font-medium hover:text-green-700"
          >
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Avatar */}
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium">
              Changer la photo
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page de vérification OTP
function OTPPage({ onVerified }: { onVerified: () => void }) {
  const { language } = useApp();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      // Simulate OTP verification - pour la demo, accepter n'importe quel code de 6 chiffres
      onVerified();
    } else {
      setError(language === 'fr' ? 'Veuillez entrer le code OTP complet' : 'Please enter the complete OTP code');
    }
  };

  const handleResend = () => {
    setOtp('');
    setError('');
    // Simulate resending OTP
    alert(language === 'fr' ? 'Code OTP renvoyé' : 'OTP code resent');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex items-center justify-center px-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'fr' ? 'Vérification OTP' : 'OTP Verification'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' 
              ? 'Entrez le code à 6 chiffres envoyé à votre téléphone'
              : 'Enter the 6-digit code sent to your phone'
            }
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            placeholder="000000"
            className="w-full text-center text-2xl font-mono bg-gray-50 border border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 tracking-widest"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleVerify}
            className="w-full h-12"
            size="lg"
            disabled={otp.length !== 6}
          >
            {language === 'fr' ? 'Vérifier' : 'Verify'}
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              {language === 'fr' ? "Vous n&apos;avez pas reçu le code ?" : "Didn't receive the code?"}
            </p>
            <button
              onClick={handleResend}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              {language === 'fr' ? 'Renvoyer le code' : 'Resend code'}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {language === 'fr' 
              ? 'Pour la démonstration, entrez n\'importe quel code à 6 chiffres'
              : 'For demo purposes, enter any 6-digit code'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

// Page de suivi des bagages
function BaggageTrackingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { language } = useApp();
  const [trackingNumber, setTrackingNumber] = useState('');
  
  // Mock baggage data
  const baggageData = {
    id: 'EDR-BAG-001',
    status: 'in-transit',
    weight: '23 kg',
    dimensions: '55 x 40 x 23 cm',
    destination: 'Dire-dawa',
    estimatedArrival: '15:30',
    currentLocation: 'Terminal Djibouti',
    timeline: [
      { time: '08:00', location: 'Enregistrement - Gare Djibouti', status: 'completed', description: 'Bagage enregistré avec succès' },
      { time: '08:30', location: 'Contrôle sécurité', status: 'completed', description: 'Bagage contrôlé et approuvé' },
      { time: '09:15', location: 'Chargement train EDR-001', status: 'completed', description: 'Bagage chargé dans le compartiment 3' },
      { time: '10:00', location: 'En transit - Holhol', status: 'in-progress', description: 'Train en cours de route' },
      { time: '15:30', location: 'Arrivée Dire-dawa', status: 'pending', description: 'Récupération disponible au comptoir bagages' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '🚂';
      case 'pending': return '⏳';
      default: return '○';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'fr' ? 'Suivi des bagages' : 'Baggage Tracking'}
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">
            {language === 'fr' ? 'Rechercher un bagage' : 'Track your baggage'}
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder={language === 'fr' ? 'Numéro de suivi (ex: EDR-BAG-001)' : 'Tracking number (ex: EDR-BAG-001)'}
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <Button 
              onClick={() => setTrackingNumber('EDR-BAG-001')}
              className="px-6"
            >
              {language === 'fr' ? 'Rechercher' : 'Track'}
            </Button>
          </div>
        </div>

        {/* Baggage Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{baggageData.id}</h3>
              <p className="text-sm text-gray-500">
                {language === 'fr' ? 'Destination:' : 'Destination:'} {baggageData.destination}
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                🚂 {language === 'fr' ? 'En transit' : 'In transit'}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'fr' ? 'Arrivée prévue:' : 'ETA:'} {baggageData.estimatedArrival}
              </p>
            </div>
          </div>

          {/* Baggage Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Poids' : 'Weight'}</p>
              <p className="font-medium">{baggageData.weight}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Dimensions' : 'Dimensions'}</p>
              <p className="font-medium">{baggageData.dimensions}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center mb-4">
            <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                <span className="text-xs text-gray-500">QR Code</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{baggageData.id}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {language === 'fr' ? 'Historique du voyage' : 'Journey Timeline'}
          </h3>
          
          <div className="relative">
            {baggageData.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ${getStatusColor(event.status)} flex items-center justify-center text-white text-sm font-bold`}>
                    {getStatusIcon(event.status)}
                  </div>
                  {index < baggageData.timeline.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-1"></div>
                  )}
                </div>
                
                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => alert(language === 'fr' ? 'Notification activée' : 'Notifications enabled')}
            className="w-full h-12 bg-green-600 hover:bg-green-700"
          >
            📱 {language === 'fr' ? 'Recevoir des notifications' : 'Get notifications'}
          </Button>
          
          <Button 
            onClick={() => alert(language === 'fr' ? 'Rapport de problème envoyé' : 'Problem report sent')}
            variant="outline"
            className="w-full h-12"
          >
            ⚠️ {language === 'fr' ? 'Signaler un problème' : 'Report an issue'}
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            {language === 'fr' ? 'Besoin d\'aide ?' : 'Need help?'}
          </h4>
          <p className="text-sm text-blue-800 mb-3">
            {language === 'fr' 
              ? 'Votre numéro de suivi se trouve sur votre étiquette de bagage ou votre reçu d\'enregistrement.'
              : 'Your tracking number can be found on your baggage tag or check-in receipt.'
            }
          </p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {language === 'fr' ? 'Contacter le support' : 'Contact support'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
} 