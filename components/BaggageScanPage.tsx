'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Camera, 
  Package, 
  User, 
  Phone, 
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Scan,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface BaggageScanPageProps {
  onNavigate: (page: string) => void;
}

export function BaggageScanPage({ onNavigate }: BaggageScanPageProps) {
  const { t, language, user } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null);
  const [userType, setUserType] = useState<'client' | 'agent'>('client');

  // Mock baggage data for demo
  const mockBaggageData = {
    baggageId: 'BAG-EDR-001234',
    owner: {
      name: 'Abdelnassir Haroun',
      phone: '+253 77 12 34 56',
      ticketId: 'TG001',
      nationality: 'Djiboutien'
    },
    trip: {
      from: 'Djibouti',
      to: 'Dire-dawa',
      date: '2025-01-15',
      trainNumber: 'EDR-101'
    },
    baggage: {
      weight: '23kg',
      type: 'Valise',
      color: 'Noir',
      brand: 'Samsonite',
      registered: '2025-01-15 07:30'
    },
    status: 'registered'
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Simulate successful scan (toujours réussir pour la démo)
      setScannedData(mockBaggageData);
      setScanResult('success');
    }, 2000);
  };

  const handleConfirmBaggage = () => {
    if (userType === 'client') {
      alert(language === 'fr' 
        ? 'Bagage confirmé comme vous appartenant !' 
        : 'Baggage confirmed as yours!');
    } else {
      alert(language === 'fr' 
        ? 'Propriétaire du bagage identifié avec succès !' 
        : 'Baggage owner successfully identified!');
    }
    onNavigate('tickets');
  };

  const resetScan = () => {
    setScannedData(null);
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('tickets')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'fr' ? 'Scanner bagage' : 'Scan Baggage'}
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* User Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'fr' ? 'Type d\'utilisateur' : 'User Type'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Button
                variant={userType === 'client' ? 'default' : 'outline'}
                onClick={() => setUserType('client')}
                className="flex-1"
              >
                <User className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Client' : 'Customer'}
              </Button>
              <Button
                variant={userType === 'agent' ? 'default' : 'outline'}
                onClick={() => setUserType('agent')}
                className="flex-1"
              >
                <Package className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Agent EDR' : 'EDR Agent'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  {language === 'fr' ? 'Instructions' : 'Instructions'}
                </h3>
                <p className="text-sm text-blue-800">
                  {userType === 'client' ? (
                    language === 'fr' 
                      ? "Scannez l'étiquette QR sur votre bagage pour confirmer qu'il vous appartient"
                      : "Scan the QR label on your baggage to confirm it belongs to you"
                  ) : (
                    language === 'fr'
                      ? "Scannez l'étiquette QR pour identifier le propriétaire du bagage"
                      : "Scan the QR label to identify the baggage owner"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scanner Section */}
        {!scannedData && (
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center border-4 border-dashed border-gray-300">
                {isScanning ? (
                  <div className="animate-spin">
                    <Scan className="w-16 h-16 text-green-600" />
                  </div>
                ) : (
                  <Camera className="w-16 h-16 text-gray-400" />
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {isScanning ? (
                    language === 'fr' ? 'Scan en cours...' : 'Scanning...'
                  ) : (
                    language === 'fr' ? 'Scanner l\'étiquette QR' : 'Scan QR Label'
                  )}
                </h2>
                <p className="text-gray-600">
                  {isScanning ? (
                    language === 'fr' 
                      ? 'Veuillez patienter...' 
                      : 'Please wait...'
                  ) : (
                    language === 'fr'
                      ? 'Pointez la caméra vers l\'étiquette QR du bagage'
                      : 'Point the camera at the baggage QR label'
                  )}
                </p>
              </div>

              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="w-full max-w-xs"
                size="lg"
              >
                {isScanning ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{language === 'fr' ? 'Scan...' : 'Scanning...'}</span>
                  </div>
                ) : (
                  <>
                    <Scan className="w-5 h-5 mr-2" />
                    {language === 'fr' ? 'Commencer le scan' : 'Start Scanning'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Scan Results */}
        {scanResult === 'error' && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center space-y-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <div>
                <h2 className="text-xl font-bold text-red-900 mb-2">
                  {language === 'fr' ? 'Scan échoué' : 'Scan Failed'}
                </h2>
                <p className="text-red-700">
                  {language === 'fr' 
                    ? 'Impossible de lire l\'étiquette QR. Veuillez réessayer.'
                    : 'Unable to read the QR label. Please try again.'}
                </p>
              </div>
              <Button onClick={resetScan} variant="outline">
                {language === 'fr' ? 'Réessayer' : 'Try Again'}
              </Button>
            </CardContent>
          </Card>
        )}

        {scanResult === 'success' && scannedData && (
          <div className="space-y-4">
            {/* Success Header */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h2 className="text-lg font-bold text-green-900">
                  {language === 'fr' ? 'Scan réussi !' : 'Scan Successful!'}
                </h2>
              </CardContent>
            </Card>

            {/* Baggage Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-green-600" />
                  <span>{language === 'fr' ? 'Informations du bagage' : 'Baggage Information'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'ID Bagage' : 'Baggage ID'}</p>
                    <p className="font-medium">{scannedData.baggageId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Poids' : 'Weight'}</p>
                    <p className="font-medium">{scannedData.baggage.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{scannedData.baggage.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Couleur' : 'Color'}</p>
                    <p className="font-medium">{scannedData.baggage.color}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>{language === 'fr' ? 'Propriétaire' : 'Owner'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Nom' : 'Name'}</p>
                    <p className="font-medium">{scannedData.owner.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Téléphone' : 'Phone'}</p>
                    <p className="font-medium">{scannedData.owner.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Billet' : 'Ticket'}</p>
                    <p className="font-medium">{scannedData.owner.ticketId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>{language === 'fr' ? 'Voyage' : 'Trip'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>{scannedData.trip.from}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span>{scannedData.trip.to}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{scannedData.trip.date}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleConfirmBaggage} className="w-full" size="lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                {userType === 'client' ? (
                  language === 'fr' ? 'Confirmer mon bagage' : 'Confirm My Baggage'
                ) : (
                  language === 'fr' ? 'Identifier le propriétaire' : 'Identify Owner'
                )}
              </Button>
              
              <Button onClick={resetScan} variant="outline" className="w-full">
                {language === 'fr' ? 'Nouveau scan' : 'New Scan'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 