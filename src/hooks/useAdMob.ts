import { useState, useEffect, useCallback } from 'react';
import admobService from '../utils/admobService';

export const useAdMob = () => {
  const [isAdReady, setIsAdReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if ad is ready initially
    setIsAdReady(admobService.isAdReady());

    // Set up polling to check ad status
    const interval = setInterval(() => {
      setIsAdReady(admobService.isAdReady());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showInterstitialAd = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await admobService.showInterstitialAd();
      return result;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadInterstitialAd = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await admobService.loadInterstitialAd();
    } catch (error) {
      console.error('Failed to load interstitial ad:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setProduction = useCallback((isProduction: boolean): void => {
    admobService.setProduction(isProduction);
  }, []);

  return {
    isAdReady,
    isLoading,
    showInterstitialAd,
    loadInterstitialAd,
    setProduction,
  };
}; 