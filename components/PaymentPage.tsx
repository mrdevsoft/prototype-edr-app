'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Shield,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import Image from 'next/image';

interface PaymentPageProps {
  onNavigate: (page: string, data?: any) => void;
  searchData?: any;
}

export function PaymentPage({ onNavigate, searchData }: PaymentPageProps) {
  const { t, currency } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoErrors, setLogoErrors] = useState<{[key: string]: boolean}>({});

  // Calculate order data from search and selected trip
  const calculateOrderData = () => {
    const basePrice = searchData?.selectedTrip?.price || 25;
    const passengers = searchData?.passengers || 1;
    const selectedSeats = searchData?.selectedSeats || [];
    const totalTicketPrice = basePrice * passengers;
    const serviceFees = Math.ceil(totalTicketPrice * 0.1); // 10% service fees
    const total = totalTicketPrice + serviceFees;

    return {
      from: searchData?.from || t.stations.djibouti,
      to: searchData?.to || t.stations.direDawa,
      date: searchData?.departureDate || '2025-01-15',
      time: searchData?.selectedTrip?.departure || '08:00',
      passengers: passengers,
      selectedSeats: selectedSeats,
      tripType: searchData?.tripType || 'oneWay',
      price: totalTicketPrice,
      fees: serviceFees,
      total: total
    };
  };

  const orderData = calculateOrderData();

  const paymentMethods = [
    {
      id: 'waafi',
      name: t.waafi,
      icon: Smartphone,
      description: 'Paiement mobile sécurisé',
      type: 'mobile',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'dmoney',
      name: t.dmoney,
      icon: Smartphone,
      description: 'Portefeuille électronique',
      type: 'mobile',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: 'card',
      name: t.creditCard,
      icon: CreditCard,
      description: 'Visa, Mastercard',
      type: 'card',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Veuillez sélectionner un mode de paiement');
      return;
    }

    // Validation des champs selon le mode de paiement
    if ((selectedMethod === 'waafi' || selectedMethod === 'dmoney')) {
      if (!phoneNumber || !pinCode) {
        alert('Veuillez remplir tous les champs requis');
        return;
      }
    } else if (selectedMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
        alert('Veuillez remplir tous les champs de la carte');
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Redirect to tickets page after 2 seconds
    setTimeout(() => {
      onNavigate('tickets');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Paiement réussi !</h2>
            <p className="text-gray-600">Votre billet a été confirmé</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Voyage: {orderData.from} → {orderData.to}
              </p>
              <p className="text-sm text-gray-500">
                Date: {orderData.date} à {orderData.time}
              </p>
              {orderData.selectedSeats.length > 0 && (
                <p className="text-sm text-gray-500">
                  Sièges: {orderData.selectedSeats.join(', ')}
                </p>
              )}
            </div>
            <div className="animate-pulse text-sm text-gray-500">
              Redirection vers vos billets...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('seat-selection', searchData)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">{t.selectPayment}</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Récapitulatif de commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Trajet:</span>
              <span className="font-medium">{orderData.from} → {orderData.to}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{orderData.date} à {orderData.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Passagers:</span>
              <span className="font-medium">{orderData.passengers}</span>
            </div>
            {orderData.selectedSeats.length > 0 && (
              <div className="flex justify-between">
                <span>Sièges:</span>
                <span className="font-medium">{orderData.selectedSeats.join(', ')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium capitalize">
                {orderData.tripType === 'oneWay' ? t.oneWay : t.roundTrip}
              </span>
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between">
                <span>Prix des billets</span>
                <span>{formatCurrency(convertCurrency(orderData.price, 'USD', currency), currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de service</span>
                <span>{formatCurrency(convertCurrency(orderData.fees, 'USD', currency), currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>{t.total}</span>
                <span className="text-green-600">
                  {formatCurrency(convertCurrency(orderData.total, 'USD', currency), currency)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.selectPayment}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                  selectedMethod === method.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {method.id === 'waafi' ? (
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center overflow-hidden">
                    {!logoErrors['waafi'] ? (
                      <Image
                        src="/waafi-logo.png"
                        alt="Waafi Money"
                        width={28}
                        height={28}
                        className="object-contain"
                        onError={() => setLogoErrors(prev => ({...prev, waafi: true}))}
                      />
                    ) : (
                      <Smartphone className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                ) : method.id === 'dmoney' ? (
                  <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center overflow-hidden">
                    {!logoErrors['dmoney'] ? (
                      <Image
                        src="/dmoney-logo.png"
                        alt="D-Money"
                        width={28}
                        height={28}
                        className="object-contain"
                        onError={() => setLogoErrors(prev => ({...prev, dmoney: true}))}
                      />
                    ) : (
                      <Smartphone className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${method.bgColor}`}>
                    <method.icon className={`w-4 h-4 ${method.iconColor}`} />
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Payment Form */}
        {selectedMethod && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Détails de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(selectedMethod === 'waafi' || selectedMethod === 'dmoney') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.phoneNumber} *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="77 XX XX XX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.pinCode} *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="****"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="pl-10"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de carte *
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'expiration *
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom sur la carte *
                    </label>
                    <Input
                      type="text"
                      placeholder="ABDELNASSIR HAROUN"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* Security Info */}
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">
                  Vos informations de paiement sont sécurisées et cryptées
                </p>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !selectedMethod}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Traitement...</span>
                  </div>
                ) : (
                  `${t.payNow} • ${formatCurrency(convertCurrency(orderData.total, 'USD', currency), currency)}`
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 