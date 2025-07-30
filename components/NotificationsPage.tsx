'use client';

import React from 'react';
import { ArrowLeft, Bell, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';

interface NotificationsPageProps {
  onNavigate: (page: string) => void;
}

export function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const { t, language } = useApp();

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: language === 'fr' ? 'Paiement confirmé' : 'Payment confirmed',
      message: language === 'fr' 
        ? 'Votre billet pour Djibouti → Dire-dawa a été confirmé'
        : 'Your ticket for Djibouti → Dire-dawa has been confirmed',
      time: '2h',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      icon: Info,
      title: language === 'fr' ? 'Rappel de voyage' : 'Travel reminder',
      message: language === 'fr'
        ? 'N\'oubliez pas votre voyage demain à 08:00'
        : 'Don\'t forget your trip tomorrow at 08:00',
      time: '5h',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertCircle,
      title: language === 'fr' ? 'Retard possible' : 'Possible delay',
      message: language === 'fr'
        ? 'Le train de 14:30 pourrait avoir 15 min de retard'
        : 'The 14:30 train might be 15 minutes late',
      time: '1j',
      unread: false
    },
    {
      id: 4,
      type: 'info',
      icon: Info,
      title: language === 'fr' ? 'Nouvelle offre' : 'New offer',
      message: language === 'fr'
        ? '20% de réduction sur les voyages de groupe'
        : '20% discount on group travel',
      time: '2j',
      unread: false
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100';
      case 'warning': return 'bg-orange-100';
      case 'info': return 'bg-blue-100';
      default: return 'bg-gray-100';
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
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">
              {language === 'fr' ? 'Notifications' : 'Notifications'}
            </h1>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Header Stats */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.unread).length} {language === 'fr' ? 'nouvelles' : 'new'}
              </h2>
              <p className="text-sm text-gray-600">
                {language === 'fr' ? 'notifications non lues' : 'unread notifications'}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            
            return (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-shadow hover:shadow-md ${
                  notification.unread ? 'ring-2 ring-green-100' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full ${getBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-semibold ${
                          notification.unread ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {notification.time}
                          </span>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${
                        notification.unread ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'fr' ? 'Aucune notification' : 'No notifications'}
            </h3>
            <p className="text-gray-500">
              {language === 'fr' 
                ? 'Vos notifications apparaîtront ici'
                : 'Your notifications will appear here'
              }
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            {language === 'fr' ? 'Marquer tout comme lu' : 'Mark all as read'}
          </button>
          <button className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors">
            {language === 'fr' ? 'Effacer les notifications' : 'Clear notifications'}
          </button>
        </div>
      </div>
    </div>
  );
} 