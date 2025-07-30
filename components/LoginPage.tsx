'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Train, Languages, Eye, EyeOff, User, Mail, Phone, IdCard, FileText } from 'lucide-react';
import { useApp, useDefaultLogin } from '@/contexts/AppContext';
import Image from 'next/image';

interface LoginPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const { language, setLanguage, t } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  // Signup fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  
  const defaultLogin = useDefaultLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Pour la démo, utiliser l'utilisateur par défaut
      defaultLogin();
      onLogin();
    } else {
      // Pour l'inscription, aller vers la page OTP
      // Ici on devrait normalement valider les données et envoyer l'OTP
      onSignup();
    }
  };

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
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center text-white space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-2 border-white">
                <Image
                  src="/edr-logo.jpeg"
                  alt="EDR Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold">EDR</h1>
                <p className="text-green-100 text-sm">Éthio-Djibouti Railway</p>
              </div>
            </div>
          </div>

          {/* Login/Signup Form */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? t.login : t.signup}
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Signup Fields */}
                {!isLogin && (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Nom complet' : 'Full name'} *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder={language === 'fr' ? 'Entrez votre nom complet' : 'Enter your full name'}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required={!isLogin}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Numéro de téléphone' : 'Phone number'} *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          type="tel"
                          placeholder="+253 77 XX XX XX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required={!isLogin}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Nationalité' : 'Nationality'} *
                      </label>
                      <Select 
                        value={nationality} 
                        onChange={(e) => setNationality(e.target.value)}
                        required={!isLogin}
                      >
                        <option value="">{language === 'fr' ? 'Sélectionnez votre nationalité' : 'Select your nationality'}</option>
                        <option value="djiboutian">{language === 'fr' ? 'Djiboutien' : 'Djiboutian'}</option>
                        <option value="foreign">{language === 'fr' ? 'Étranger' : 'Foreign'}</option>
                      </Select>
                    </div>

                    {/* ID Number (for Djiboutians) */}
                    {nationality === 'djiboutian' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'fr' ? "Numéro de carte d'identité" : 'ID card number'} *
                        </label>
                        <div className="relative">
                          <IdCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            type="text"
                            placeholder={language === 'fr' ? 'Ex: 123456789' : 'Ex: 123456789'}
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            required={nationality === 'djiboutian'}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}

                    {/* Passport Number (for foreigners) */}
                    {nationality === 'foreign' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'fr' ? 'Numéro de passeport' : 'Passport number'} *
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            type="text"
                            placeholder={language === 'fr' ? 'Ex: A1234567' : 'Ex: A1234567'}
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                            required={nationality === 'foreign'}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.email} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder={t.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.password} *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.password}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  {isLogin ? t.login : (language === 'fr' ? "S'inscrire" : 'Sign up')}
                </Button>
              </form>

              {/* Toggle between login and signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? (
                    <>
                      {language === 'fr' ? "Pas encore de compte ?" : "Don't have an account?"}{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        {language === 'fr' ? "S'inscrire" : 'Sign up'}
                      </button>
                    </>
                  ) : (
                    <>
                      {language === 'fr' ? "Déjà un compte ?" : "Already have an account?"}{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        {t.login}
                      </button>
                    </>
                  )}
                </p>
              </div>

              {isLogin && (
                <div className="mt-4 text-center">
                  <button className="text-sm text-green-600 hover:text-green-700">
                    {language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-green-100 text-sm p-4">
        <p>&copy; 2025 EDR - {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}</p>
      </div>
    </div>
  );
} 