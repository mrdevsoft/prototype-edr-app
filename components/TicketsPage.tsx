'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Train, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Armchair,
  QrCode,
  Download,
  Share2,
  Package
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, convertCurrency } from '@/lib/utils';

interface TicketsPageProps {
  onNavigate: (page: string) => void;
}

export function TicketsPage({ onNavigate }: TicketsPageProps) {
  const { t, currency, language, user } = useApp();

  // Mock tickets data
  const tickets = [
    {
      id: 'TG001',
      from: t.stations.djibouti,
      to: t.stations.direDawa,
      date: '2025-01-15',
      time: '08:00',
      seat: 'A12',
      coach: '2',
      status: 'confirmed',
      price: 25,
      passenger: user?.name || 'Abdelnassir Haroun',
      qrCode: 'TG001-ABC123-XYZ789'
    },
    {
      id: 'TG002',
      from: t.stations.aliSabieh,
      to: t.stations.holhol,
      date: '2025-01-18',
      time: '14:30',
      seat: 'B08',
      coach: '1',
      status: 'pending',
      price: 8,
      passenger: user?.name || 'Abdelnassir Haroun',
      qrCode: 'TG002-DEF456-UVW012'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return t.confirmed;
      case 'pending': return t.pending;
      case 'cancelled': return t.cancelled;
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">{t.myTickets}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <Train className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.noTicketsFound}</p>
            <Button 
              onClick={() => onNavigate('home')} 
              className="mt-4"
            >
              {t.searchTrains}
            </Button>
          </div>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id} className="shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-green-600">
                    {ticket.id}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {getStatusText(ticket.status)}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* QR Code Section */}
                <div className="flex items-center justify-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-black mx-auto mb-2 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{ticket.qrCode}</p>
                  </div>
                </div>

                {/* Route Information */}
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">{ticket.from}</p>
                      <p className="text-sm text-gray-500">Départ</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <Train className="w-6 h-6 text-green-600" />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{ticket.to}</p>
                      <p className="text-sm text-gray-500">Arrivée</p>
                    </div>
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{ticket.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Heure</p>
                      <p className="font-medium">{ticket.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Armchair className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t.seat}</p>
                      <p className="font-medium">{ticket.seat}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Train className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t.coach}</p>
                      <p className="font-medium">{ticket.coach}</p>
                    </div>
                  </div>
                </div>

                {/* Passenger & Price */}
                <div className="flex items-center justify-between py-3 border-t">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t.passenger}</p>
                      <p className="font-medium">{ticket.passenger}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{t.price}</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(convertCurrency(ticket.price, 'USD', currency), currency)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button
                    onClick={() => alert('Téléchargement du billet...')}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t.download}
                  </Button>
                  <Button
                    onClick={() => alert('Partage du billet...')}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {t.share}
                  </Button>
                  <Button
                    onClick={() => onNavigate('baggage-scan')}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Scanner' : 'Scan'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 