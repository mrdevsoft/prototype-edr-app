'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Menu, 
  MapPin,
  Send,
  CalendarDays, 
  Users, 
  Train,
  Heart,
  Gift,
  Ticket,
  Clock,
  Bell,
  Search
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, convertCurrency } from '@/lib/utils';

interface SearchData {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  tripType?: 'oneWay' | 'roundTrip';
}

interface HomePageProps {
  onNavigate: (page: string, data?: SearchData) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { setSidebarOpen, t, currency, language } = useApp();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');

  const stations = [
    { value: 'djibouti', label: t.stations.djibouti },
    { value: 'direDawa', label: t.stations.direDawa },
    { value: 'nagad', label: t.stations.nagad },
    { value: 'holhol', label: t.stations.holhol },
    { value: 'aliSabieh', label: t.stations.aliSabieh },
    { value: 'dawaleh', label: t.stations.dawaleh },
  ];

  const popularRoutes = [
    { from: t.stations.djibouti, to: t.stations.direDawa, price: 25, duration: '12h' },
    { from: t.stations.djibouti, to: t.stations.aliSabieh, price: 12, duration: '3h' },
    { from: t.stations.holhol, to: t.stations.nagad, price: 8, duration: '2h' },
  ];

  const recentSearches = [
    { from: t.stations.djibouti, to: t.stations.direDawa, date: '2025-01-15' },
    { from: t.stations.aliSabieh, to: t.stations.holhol, date: '2025-01-18' },
  ];

  const specialOffers = [
    { title: language === 'fr' ? 'Réduction étudiants' : 'Student discount', discount: '20%' },
    { title: language === 'fr' ? 'Voyage de groupe' : 'Group travel', discount: '15%' },
  ];

  const handleSearch = () => {
    // Validation des champs requis
    if (!from || !to || !departureDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (from === to) {
      alert('Les gares de départ et d\'arrivée doivent être différentes');
      return;
    }

    // Récupérer les labels des stations pour l'affichage
    const fromStation = stations.find(s => s.value === from);
    const toStation = stations.find(s => s.value === to);

    // Données de recherche à passer à la page de résultats
    const searchData = {
      from: fromStation?.label || from,
      to: toStation?.label || to,
      fromValue: from,
      toValue: to,
      departureDate,
      returnDate: tripType === 'roundTrip' ? returnDate : undefined,
      passengers,
      tripType
    };

    // Naviguer vers les résultats de recherche
    onNavigate('search-results', searchData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Train className="w-6 h-6 text-green-600" />
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">EDR</h1>
              <p className="text-xs text-gray-500">Éthio-Djibouti Railway</p>
            </div>
          </div>
          
          <button
            onClick={() => onNavigate('notifications')}
            className="p-2 hover:bg-gray-100 rounded-lg relative"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Form */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Trip Type */}
              <div className="flex space-x-3 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={tripType === 'oneWay' ? 'default' : 'ghost'}
                  onClick={() => setTripType('oneWay')}
                  className="flex-1 h-12"
                >
                  {t.oneWay}
                </Button>
                <Button
                  variant={tripType === 'roundTrip' ? 'default' : 'ghost'}
                  onClick={() => setTripType('roundTrip')}
                  className="flex-1 h-12"
                >
                  {t.roundTrip}
                </Button>
              </div>

              {/* From/To */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.from} *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Select 
                      value={from} 
                      onChange={(e) => setFrom(e.target.value)} 
                      required
                      className="pl-10 h-12"
                    >
                      <option value="">{t.from}</option>
                      {stations.map((station) => (
                        <option key={station.value} value={station.value}>
                          {station.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.to} *
                  </label>
                  <div className="relative">
                    <Send className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Select 
                      value={to} 
                      onChange={(e) => setTo(e.target.value)} 
                      required
                      className="pl-10 h-12"
                    >
                      <option value="">{t.to}</option>
                      {stations.map((station) => (
                        <option key={station.value} value={station.value}>
                          {station.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.departure} *
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 z-10" />
                    <Input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min="2025-01-01"
                      required
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                {tripType === 'roundTrip' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.return} *
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 z-10" />
                      <Input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={departureDate || "2025-01-01"}
                        required={tripType === 'roundTrip'}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.passengers}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Select 
                    value={passengers.toString()} 
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="pl-10 h-12"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? 'passager' : 'passagers'}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} className="w-full h-12" size="lg">
                <Search className="w-5 h-5 mr-2" />
                {t.searchTrains}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.quickAccess}</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('tickets')}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <Ticket className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t.tickets}</p>
            </button>
            
            <button className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t.favorites}</p>
            </button>
            
            <button className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <Gift className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t.offers}</p>
            </button>
          </div>
        </div>

        {/* Popular Routes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.popularRoutes}</h2>
          <div className="space-y-3">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-sm font-medium">
                        <span>{route.from}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span>{route.to}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{route.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(convertCurrency(route.price, 'USD', currency), currency)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.recentSearches}</h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <span>{search.from}</span>
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span>{search.to}</span>
                      </div>
                      <span className="text-xs text-gray-500">{search.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Special Offers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.specialOffers}</h2>
          <div className="space-y-3">
            {specialOffers.map((offer, index) => (
              <Card key={index} className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr' ? 'Économisez jusqu\'à' : 'Save up to'} {offer.discount}
                      </p>
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {offer.discount}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 