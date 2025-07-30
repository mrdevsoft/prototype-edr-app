import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Conversion USD to DJF (1 USD = 177 DJF)
export const USD_TO_DJF_RATE = 177;

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) return amount;
  
  if (fromCurrency === 'USD' && toCurrency === 'DJF') {
    return amount * USD_TO_DJF_RATE;
  } else if (fromCurrency === 'DJF' && toCurrency === 'USD') {
    return amount / USD_TO_DJF_RATE;
  }
  
  return amount;
}

export function formatCurrency(amount: number, currency: string): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  } else if (currency === 'DJF') {
    return `${Math.round(amount)} DJF`;
  }
  return `${amount}`;
} 