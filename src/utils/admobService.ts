import { AdMobInterstitial, setTestDeviceIDAsync } from 'expo-ads-admob';
import { Platform } from 'react-native';

// Ad Unit ID for interstitial ads
const INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-9953142465857958/8766221735';

// Test ad unit IDs for development
const TEST_INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
});

class AdMobService {
  private isProduction = false; // Set to true for production
  private adUnitId: string;
  private isAdLoaded = false;
  private isAdLoading = false;

  constructor() {
    this.adUnitId = this.isProduction ? INTERSTITIAL_AD_UNIT_ID : TEST_INTERSTITIAL_AD_UNIT_ID || INTERSTITIAL_AD_UNIT_ID;
    this.initializeAds();
  }

  private async initializeAds() {
    try {
      // Set test device ID for development (optional)
      if (!this.isProduction) {
        await setTestDeviceIDAsync('EMULATOR');
      }
      
      // Set up event listeners
      AdMobInterstitial.addEventListener('interstitialDidLoad', () => {
        console.log('Interstitial ad loaded');
        this.isAdLoaded = true;
        this.isAdLoading = false;
      });

      AdMobInterstitial.addEventListener('interstitialDidFailToLoad', (error) => {
        console.log('Interstitial ad failed to load:', error);
        this.isAdLoaded = false;
        this.isAdLoading = false;
      });

      AdMobInterstitial.addEventListener('interstitialDidOpen', () => {
        console.log('Interstitial ad opened');
      });

      AdMobInterstitial.addEventListener('interstitialDidClose', () => {
        console.log('Interstitial ad closed');
        this.isAdLoaded = false;
        // Preload next ad
        this.loadInterstitialAd();
      });

      AdMobInterstitial.addEventListener('interstitialWillLeaveApplication', () => {
        console.log('Interstitial ad will leave application');
      });

      // Load the first ad
      await this.loadInterstitialAd();
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  async loadInterstitialAd(): Promise<void> {
    if (this.isAdLoading || this.isAdLoaded) {
      return;
    }

    try {
      this.isAdLoading = true;
      AdMobInterstitial.setAdUnitID(this.adUnitId);
      await AdMobInterstitial.requestAdAsync();
    } catch (error) {
      console.error('Failed to load interstitial ad:', error);
      this.isAdLoading = false;
    }
  }

  async showInterstitialAd(): Promise<boolean> {
    try {
      if (!this.isAdLoaded) {
        console.log('No ad available to show');
        // Try to load an ad for next time
        this.loadInterstitialAd();
        return false;
      }

      await AdMobInterstitial.showAdAsync();
      return true;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      return false;
    }
  }

  isAdReady(): boolean {
    return this.isAdLoaded;
  }

  setProduction(isProduction: boolean): void {
    this.isProduction = isProduction;
    this.adUnitId = isProduction ? INTERSTITIAL_AD_UNIT_ID : TEST_INTERSTITIAL_AD_UNIT_ID || INTERSTITIAL_AD_UNIT_ID;
  }

  // Clean up event listeners
  cleanup(): void {
    AdMobInterstitial.removeAllListeners();
  }
}

// Export singleton instance
export const admobService = new AdMobService();
export default admobService; 