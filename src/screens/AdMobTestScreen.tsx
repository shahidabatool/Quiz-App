import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import FuturisticButton from '../components/FuturisticButton';
import { useAdMob } from '../hooks/useAdMob';

interface Props {
  navigation: any;
}

const AdMobTestScreen: React.FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { showInterstitialAd, isAdReady, loadInterstitialAd, isLoading, setProduction } = useAdMob();

  const handleShowAd = async () => {
    const success = await showInterstitialAd();
    if (!success) {
      console.log('Ad not ready or failed to show');
    }
  };

  const handleLoadAd = async () => {
    await loadInterstitialAd();
  };

  const handleToggleProduction = () => {
    setProduction(true); // Toggle to production mode
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AdMob Test Screen
        </Text>
        
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: theme.colors.text }]}>
            Ad Status: {isAdReady ? 'Ready' : 'Not Ready'}
          </Text>
          <Text style={[styles.statusText, { color: theme.colors.text }]}>
            Loading: {isLoading ? 'Yes' : 'No'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <FuturisticButton
            title="Show Interstitial Ad"
            onPress={handleShowAd}
            variant="primary"
            disabled={!isAdReady || isLoading}
            style={styles.button}
          />
          
          <FuturisticButton
            title="Load Ad"
            onPress={handleLoadAd}
            variant="secondary"
            disabled={isLoading}
            style={styles.button}
          />
          
          <FuturisticButton
            title="Set Production Mode"
            onPress={handleToggleProduction}
            variant="danger"
            style={styles.button}
          />
          
          <FuturisticButton
            title="Back to Home"
            onPress={() => navigation.navigate('Home')}
            variant="primary"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  statusContainer: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    width: '100%',
  },
});

export default AdMobTestScreen; 