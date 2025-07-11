import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import DarkModeToggle from '../components/DarkModeToggle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useAdMob } from '../hooks/useAdMob';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { showInterstitialAd, isAdReady, setProduction } = useAdMob();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Set production mode for AdMob (set to true for production)
  useEffect(() => {
    setProduction(false); // Set to true for production build
  }, [setProduction]);

  // Helper function to show interstitial ad with delay
  const showAdWithDelay = async () => {
    if (isAdReady) {
      try {
        await showInterstitialAd();
        // Small delay to ensure ad completes before navigation
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.log('Failed to show interstitial ad:', error);
      }
    }
  };

  useEffect(() => {
    // Simple entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    rotate.start();

    return () => rotate.stop();
  }, []);

  const rotateStyle = {
    transform: [{
      rotate: rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    }],
  };

  // SIMPLE NAVIGATION FUNCTIONS
  const goToCanada = async () => {
    console.log('🇨🇦 Going to Canada!');
    // Show interstitial ad before navigating to Canada section
    await showAdWithDelay();
    navigation.navigate('CanadianModules');
  };

  const goToUK = async () => {
    console.log('🇬🇧 Going to UK!');
    // Show interstitial ad before navigating to UK section
    await showAdWithDelay();
    navigation.navigate('UKCitizenship');
  };

  const goToAboutUs = async () => {
    console.log('👥 Going to About Us!');
    // Show interstitial ad before navigating to About Us
    await showAdWithDelay();
    // HACK: Use working Canada navigation but with About Us flag
    navigation.navigate('CanadianModules', { showAboutUs: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Background Effects */}
      <View style={styles.backgroundContainer}>
        <Animated.View style={[
          styles.backgroundCircle,
          { backgroundColor: theme.colors.neonPurple, opacity: 0.1 },
          rotateStyle,
        ]} />
        <Animated.View style={[
          styles.backgroundCircle2,
          { backgroundColor: theme.colors.neonBlue, opacity: 0.1 },
          rotateStyle,
        ]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              GLOBALCITIZEN PREP
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.neonPurple }]}>
              QUIZ MASTER
            </Text>
            <View style={styles.titleUnderline} />
          </View>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Master your citizenship test with our advanced AI-powered learning system
          </Text>
        </Animated.View>

        {/* Dark Mode Toggle */}
        <Animated.View style={[
          styles.toggleContainer,
          { opacity: fadeAnim }
        ]}>
          <DarkModeToggle />
        </Animated.View>

        {/* Module Cards */}
        <Animated.View style={[
          styles.modulesContainer,
          { opacity: fadeAnim }
        ]}>
          {/* Canada Card */}
          <View style={[
            styles.moduleCard,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.neonBlue }
          ]}>
            <TouchableOpacity style={styles.moduleButton} onPress={goToCanada}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.neonBlue }
              ]}>
                <Text style={styles.moduleIcon}>🇨🇦</Text>
              </View>
              <View style={styles.moduleContent}>
                <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
                  CANADIAN CITIZENSHIP
                </Text>
                <Text style={[styles.moduleSubtitle, { color: theme.colors.textSecondary }]}>
                  Practice tests, study guides, and mock exams
                </Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.backgroundSecondary }]}>
                    <View style={[styles.progressFill, { backgroundColor: theme.colors.neonBlue }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.neonBlue }]}>
                    READY
                  </Text>
                </View>
              </View>
              <View style={[styles.arrowContainer, { borderColor: theme.colors.neonBlue }]}>
                <Text style={[styles.arrow, { color: theme.colors.neonBlue }]}>→</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* UK Card */}
          <View style={[
            styles.moduleCard,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.neonPurple }
          ]}>
            <TouchableOpacity style={styles.moduleButton} onPress={goToUK}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.neonPurple }
              ]}>
                <Text style={styles.moduleIcon}>🇬🇧</Text>
              </View>
              <View style={styles.moduleContent}>
                <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
                  UK CITIZENSHIP
                </Text>
                <Text style={[styles.moduleSubtitle, { color: theme.colors.textSecondary }]}>
                  Life in the UK test preparation
                </Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.backgroundSecondary }]}>
                    <View style={[styles.progressFill, { backgroundColor: theme.colors.neonPurple }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.neonPurple }]}>
                    READY
                  </Text>
                </View>
              </View>
              <View style={[styles.arrowContainer, { borderColor: theme.colors.neonPurple }]}>
                <Text style={[styles.arrow, { color: theme.colors.neonPurple }]}>→</Text>
              </View>
            </TouchableOpacity>
          </View>



          {/* About Us Card - Original Design */}
          <View style={[
            styles.moduleCard,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.neonGreen }
          ]}>
            <TouchableOpacity 
              style={[styles.moduleButton, { zIndex: 10, elevation: 10 }]} 
              onPress={goToAboutUs}
              activeOpacity={0.7}
            >
              <View style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.neonGreen }
              ]}>
                <Text style={styles.moduleIcon}>👥</Text>
              </View>
              <View style={styles.moduleContent}>
                <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
                  ABOUT US
                </Text>
                <Text style={[styles.moduleSubtitle, { color: theme.colors.textSecondary }]}>
                  Learn more about GlobalCitizen Prep
                </Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.backgroundSecondary }]}>
                    <View style={[styles.progressFill, { backgroundColor: theme.colors.neonGreen }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.neonGreen }]}>
                    INFO
                  </Text>
                </View>
              </View>
              <View style={[styles.arrowContainer, { borderColor: theme.colors.neonGreen }]}>
                <Text style={[styles.arrow, { color: theme.colors.neonGreen }]}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -100,
    right: -100,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: -50,
    left: -50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 5,
  },
  titleUnderline: {
    width: 80,
    height: 3,
    backgroundColor: '#8b5cf6',
    marginTop: 10,
    borderRadius: 2,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  toggleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  modulesContainer: {
    gap: 20,
  },
  moduleCard: {
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  moduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  moduleIcon: {
    fontSize: 24,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 5,
  },
  moduleSubtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 