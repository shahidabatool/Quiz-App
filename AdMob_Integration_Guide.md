# AdMob Integration Guide

## Overview
This guide explains how to use the AdMob interstitial ads integration in your React Native/Expo app. The integration uses the provided App ID and Ad Unit ID to display interstitial advertisements at strategic points in the user journey.

## Configuration Details

### App ID and Ad Unit ID
- **App ID**: `ca-app-pub-9953142465857958~2804847418`
- **Ad Unit ID**: `ca-app-pub-9953142465857958/8766221735`

### Files Created/Modified
1. **`src/utils/admobService.ts`** - Core AdMob service singleton
2. **`src/hooks/useAdMob.ts`** - React hook for easy component integration
3. **`app.json`** - Configuration with AdMob plugin setup
4. **`package.json`** - Added expo-ads-admob dependency

## Configuration Files

### app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-ads-admob",
        {
          "androidAppId": "ca-app-pub-9953142465857958~2804847418",
          "iosAppId": "ca-app-pub-9953142465857958~2804847418"
        }
      ]
    ],
    "android": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-9953142465857958~2804847418"
      }
    },
    "ios": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-9953142465857958~2804847418"
      }
    }
  }
}
```

## Usage in Components

### Basic Usage
```tsx
import { useAdMob } from '../hooks/useAdMob';

const MyComponent = () => {
  const { showInterstitialAd, isAdReady, setProduction } = useAdMob();

  const handleShowAd = async () => {
    if (isAdReady) {
      await showInterstitialAd();
    }
  };

  return (
    <Button onPress={handleShowAd} title="Show Ad" />
  );
};
```

### Advanced Usage with Error Handling
```tsx
const handleFinishQuiz = async () => {
  try {
    // Show interstitial ad before showing results
    if (isAdReady) {
      await showInterstitialAd();
      // Small delay to ensure ad completes
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.log('Failed to show interstitial ad:', error);
  }
  
  // Continue with normal flow
  setShowResults(true);
};
```

## Integration Points

### Current Integration Points
1. **Quiz Completion** - Shows ad when user finishes a quiz
2. **Results Navigation** - Shows ad when navigating back to home from results
3. **Section Navigation** - Shows ad when navigating between Canada/UK sections
4. **Home Screen** - Shows ad when navigating to different modules

### Files Modified
- `src/screens/QuizScreen.tsx` - Main quiz screen with ads on completion
- `src/screens/UKQuizScreen.tsx` - UK quiz screen with ads on completion
- `src/screens/HomeScreen.tsx` - Home screen with ads on section navigation

## Production vs Development Mode

### Development Mode (Default)
- Uses Google's test ad unit IDs
- Shows test ads that don't generate revenue
- Safe for development and testing

### Production Mode
```tsx
// Set to true for production builds
setProduction(true);
```

### Test Ad Unit IDs
- **iOS**: `ca-app-pub-3940256099942544/4411468910`
- **Android**: `ca-app-pub-3940256099942544/1033173712`

## AdMob Service Features

### Core Features
1. **Auto-initialization** - Starts loading ads immediately
2. **Event handling** - Listens for ad load, show, and close events
3. **Auto-reload** - Automatically loads next ad after showing one
4. **Error handling** - Graceful fallbacks when ads fail to load
5. **Test device support** - Automatically sets test device ID for development

### Service Methods
- `showInterstitialAd()` - Shows loaded ad
- `loadInterstitialAd()` - Loads a new ad
- `isAdReady()` - Check if ad is ready to show
- `setProduction(boolean)` - Switch between test and production ads

## Hook API

### useAdMob Hook
```tsx
const {
  isAdReady,        // boolean - Is ad ready to show
  isLoading,        // boolean - Is ad currently loading
  showInterstitialAd, // function - Show the ad
  loadInterstitialAd, // function - Load a new ad
  setProduction,    // function - Set production mode
} = useAdMob();
```

## Best Practices

### 1. Strategic Placement
- Show ads at natural break points in user flow
- Avoid showing ads during active gameplay/quiz taking
- Consider user experience over ad frequency

### 2. Error Handling
```tsx
const showAdWithDelay = async () => {
  if (isAdReady) {
    try {
      await showInterstitialAd();
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log('Failed to show interstitial ad:', error);
    }
  }
};
```

### 3. User Experience
- Always check `isAdReady` before showing ads
- Provide fallbacks when ads fail to load
- Don't block user actions waiting for ads

## Testing

### Test Screen
A test screen (`AdMobTestScreen.tsx`) is included to:
- Check ad loading status
- Manually trigger ad display
- Toggle between test and production modes
- Monitor ad events in console

### Testing Steps
1. Run app in development mode
2. Navigate to test screen
3. Check ad status
4. Load and show test ads
5. Monitor console for ad events

## Troubleshooting

### Common Issues

1. **Ads not loading**
   - Check internet connection
   - Verify App ID and Ad Unit ID
   - Check console for error messages

2. **Test ads not showing**
   - Ensure development mode is enabled
   - Check test device ID setup
   - Verify expo-ads-admob installation

3. **Production ads not showing**
   - Ensure production mode is enabled
   - Verify AdMob account setup
   - Check ad unit is active in AdMob console

### Debug Information
- All ad events are logged to console
- Check React Native debugger for detailed logs
- Monitor AdMob console for ad serving metrics

## Building for Production

### Before Building
1. Set production mode to `true` in all components
2. Test with production ad unit IDs
3. Verify AdMob account is properly configured
4. Update app.json with correct App ID

### Build Commands
```bash
# For development
expo start

# For production build
expo build:android
expo build:ios
```

## Revenue Optimization

### Ad Frequency
- Current implementation shows ads at key user journey points
- Consider adding frequency caps to avoid overwhelming users
- Monitor user retention vs ad revenue

### Ad Placement Strategy
- Quiz completion: High engagement, natural break point
- Section navigation: Moderate engagement, exploration phase
- Results viewing: High engagement, completion satisfaction

## Support and Maintenance

### Monitoring
- Monitor AdMob console for performance metrics
- Track user engagement and retention
- Monitor console logs for ad loading issues

### Updates
- Keep expo-ads-admob updated to latest version
- Monitor for Expo SDK updates affecting AdMob
- Regular testing of ad loading and display

## Additional Resources

- [Expo AdMob Documentation](https://docs.expo.dev/versions/latest/sdk/admob/)
- [Google AdMob Help Center](https://support.google.com/admob/)
- [React Native AdMob Integration](https://github.com/react-native-admob/react-native-admob)

## Notes

- The integration respects user preferences with proper error handling
- Ads are shown strategically to maintain good user experience
- Test mode is enabled by default for development safety
- Production mode must be explicitly enabled for revenue generation 