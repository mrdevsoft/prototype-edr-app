'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-6 px-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isCompleted
                    ? 'bg-green-600 border-green-600 text-white'
                    : isActive
                    ? 'border-green-600 bg-green-50 text-green-600'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{stepNumber}</span>
                )}
              </div>
              
              {/* Step Label */}
              <span
                className={`text-xs mt-2 text-center max-w-20 leading-tight ${
                  isActive || isCompleted ? 'text-green-600 font-medium' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
} 