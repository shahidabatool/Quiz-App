import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import DarkModeToggle from '../components/DarkModeToggle';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Entrance animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous animations
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    rotate.start();

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    );
    glow.start();

    return () => {
      pulse.stop();
      rotate.stop();
      glow.stop();
    };
  }, []);

  const rotateStyle = {
    transform: [{
      rotate: rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    }],
  };

  const glowStyle = {
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.8],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 20],
    }),
  };

  const navigateToModule = (module: string) => {
    console.log('🚀 Navigating to module:', module);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (module === 'canada') {
        console.log('🇨🇦 Navigating to CanadianModules');
        navigation.navigate('CanadianModules');
      } else if (module === 'uk') {
        console.log('🇬🇧 Navigating to UKCitizenship');
        navigation.navigate('UKCitizenship');
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Animated background elements */}
      <View style={styles.backgroundContainer}>
        <Animated.View
          style={[
            styles.backgroundCircle,
            {
              backgroundColor: theme.colors.neonPurple,
              opacity: 0.1,
            },
            rotateStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundCircle2,
            {
              backgroundColor: theme.colors.neonBlue,
              opacity: 0.1,
            },
            rotateStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundCircle3,
            {
              backgroundColor: theme.colors.neonGreen,
              opacity: 0.1,
            },
            rotateStyle,
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Futuristic title with glow effect */}
          <Animated.View
            style={[
              styles.titleContainer,
              glowStyle,
            ]}
          >
            <Text style={[styles.title, { color: theme.colors.text }]}>
              CITIZENSHIP
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.neonPurple }]}>
              QUIZ MASTER
            </Text>
            <View style={styles.titleUnderline} />
          </Animated.View>

          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Master your citizenship test with our advanced AI-powered learning system
          </Text>
        </Animated.View>

        {/* Dark Mode Toggle */}
        <Animated.View
          style={[
            styles.toggleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <DarkModeToggle />
        </Animated.View>

        {/* Module Selection Cards */}
        <View style={styles.modulesContainer}>
          {/* Canada Module */}
          <Animated.View
            style={[
              styles.moduleCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.neonBlue,
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: pulseAnim },
                ],
              },
              glowStyle,
            ]}
          >
            <TouchableOpacity
              style={[styles.moduleButton, { zIndex: 10 }]}
              onPress={() => {
                console.log('🇨🇦 Canada card pressed!');
                navigateToModule('canada');
              }}
              activeOpacity={0.8}
            >
              {/* Futuristic icon container */}
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.colors.neonBlue,
                  borderColor: theme.colors.neonGreen,
                }
              ]}>
                <Text style={styles.moduleIcon}>🇨🇦</Text>
                <View style={[
                  styles.iconGlow,
                  { backgroundColor: theme.colors.neonBlue }
                ]} />
              </View>

              <View style={styles.moduleContent}>
                <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
                  CANADIAN CITIZENSHIP
                </Text>
                <Text style={[styles.moduleSubtitle, { color: theme.colors.textSecondary }]}>
                  Practice tests, study guides, and mock exams
                </Text>
                
                {/* Futuristic progress indicator */}
                <View style={styles.progressContainer}>
                  <View style={[
                    styles.progressBar,
                    { backgroundColor: theme.colors.backgroundSecondary }
                  ]}>
                    <View style={[
                      styles.progressFill,
                      { backgroundColor: theme.colors.neonBlue }
                    ]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.neonBlue }]}>
                    READY
                  </Text>
                </View>
              </View>

              {/* Arrow indicator */}
              <View style={[
                styles.arrowContainer,
                { borderColor: theme.colors.neonBlue }
              ]}>
                <Text style={[styles.arrow, { color: theme.colors.neonBlue }]}>
                  →
                </Text>
              </View>
            </TouchableOpacity>

            {/* Cyberpunk border effect */}
            <View style={[
              styles.cyberBorder,
              { borderColor: theme.colors.neonPink }
            ]} />
          </Animated.View>

          {/* UK Module */}
          <Animated.View
            style={[
              styles.moduleCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.neonPurple,
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: pulseAnim },
                ],
              },
              glowStyle,
            ]}
          >
            <TouchableOpacity
              style={[styles.moduleButton, { zIndex: 10 }]}
              onPress={() => {
                console.log('🇬🇧 UK card pressed!');
                navigateToModule('uk');
              }}
              activeOpacity={0.8}
            >
              {/* Futuristic icon container */}
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.colors.neonPurple,
                  borderColor: theme.colors.neonGreen,
                }
              ]}>
                <Text style={styles.moduleIcon}>🇬🇧</Text>
                <View style={[
                  styles.iconGlow,
                  { backgroundColor: theme.colors.neonPurple }
                ]} />
              </View>

              <View style={styles.moduleContent}>
                <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
                  UK CITIZENSHIP
                </Text>
                <Text style={[styles.moduleSubtitle, { color: theme.colors.textSecondary }]}>
                  Life in the UK test preparation
                </Text>
                
                {/* Futuristic progress indicator */}
                <View style={styles.progressContainer}>
                  <View style={[
                    styles.progressBar,
                    { backgroundColor: theme.colors.backgroundSecondary }
                  ]}>
                    <View style={[
                      styles.progressFill,
                      { backgroundColor: theme.colors.neonPurple }
                    ]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.neonPurple }]}>
                    READY
                  </Text>
                </View>
              </View>

              {/* Arrow indicator */}
              <View style={[
                styles.arrowContainer,
                { borderColor: theme.colors.neonPurple }
              ]}>
                <Text style={[styles.arrow, { color: theme.colors.neonPurple }]}>
                  →
                </Text>
              </View>
            </TouchableOpacity>

            {/* Cyberpunk border effect */}
            <View style={[
              styles.cyberBorder,
              { borderColor: theme.colors.neonPink }
            ]} />
          </Animated.View>
        </View>

        {/* Floating particles */}
        <View style={styles.particlesContainer}>
          {[...Array(12)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                {
                  backgroundColor: theme.colors.neonGreen,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: [{ scale: pulseAnim }],
                }
              ]}
            />
          ))}
        </View>
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
  backgroundCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    top: '50%',
    right: -75,
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
    marginBottom: 10,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
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
    marginTop: 15,
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
    position: 'relative',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    opacity: 0.3,
  },
  moduleIcon: {
    fontSize: 24,
    zIndex: 1,
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
  cyberBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    borderWidth: 1,
    opacity: 0.6,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.6,
  },
});

export default HomeScreen; 