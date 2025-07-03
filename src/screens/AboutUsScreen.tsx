import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';

export default function AboutUsScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

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

    // Glow animation
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
      glow.stop();
    };
  }, []);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

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
          {/* Title with glow effect */}
          <Animated.View
            style={[
              styles.titleContainer,
              glowStyle,
            ]}
          >
            <Text style={[styles.title, { color: theme.colors.text }]}>
              ABOUT US
            </Text>
            <View style={[styles.titleUnderline, { backgroundColor: theme.colors.neonPurple }]} />
          </Animated.View>
        </Animated.View>

        {/* Content Card */}
        <Animated.View
          style={[
            styles.contentCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.neonBlue,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
            glowStyle,
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🌍</Text>
          </View>

          <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
            Welcome to <Text style={[styles.brandName, { color: theme.colors.neonPurple }]}>GlobalCitizen Prep</Text>, your trusted companion in preparing for the UK and Canada citizenship tests.
          </Text>

          <Text style={[styles.missionText, { color: theme.colors.textSecondary }]}>
            Our mission is simple: to help you succeed by providing high-quality, accurate, and up-to-date practice tools that build your confidence and improve your performance on test day.
          </Text>

          <Text style={[styles.bodyText, { color: theme.colors.textSecondary }]}>
            Every question in the app is crafted using reliable sources, including official government materials and recognized study guides. We understand how important this milestone is, and we're here to make your preparation journey smoother and more effective.
          </Text>

          {/* Features Section */}
          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.neonGreen }]}>
              What GlobalCitizen Prep Offers:
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
              Our app includes four powerful learning modes to support every stage of your preparation:
            </Text>

            {/* Feature Cards */}
            <View style={styles.featuresList}>
              {[
                {
                  icon: '🎯',
                  title: 'Mock Test',
                  description: 'Experience real exam conditions with timed, full-length simulations. Review correct answers at the end to track your progress.',
                  color: theme.colors.neonBlue,
                },
                {
                  icon: '✍️',
                  title: 'Quiz Mode',
                  description: 'Engage with bite-sized quizzes that offer instant, explained answers, ideal for quick learning and review.',
                  color: theme.colors.neonPurple,
                },
                {
                  icon: '📚',
                  title: 'Chapterwise Practice',
                  description: 'Study one topic at a time with structured questions aligned to official chapters and formats.',
                  color: theme.colors.neonGreen,
                },
                {
                  icon: '📖',
                  title: 'Official Preparation Material',
                  description: 'Access a direct link to a trusted PDF or book for full-length study and deeper understanding.',
                  color: theme.colors.neonPink,
                },
              ].map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      backgroundColor: theme.colors.backgroundSecondary,
                      borderColor: feature.color,
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 50],
                            outputRange: [0, 50 + (index * 10)],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                    <Text style={styles.featureIconText}>{feature.icon}</Text>
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                      {feature.title}
                    </Text>
                    <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                      {feature.description}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Closing Message */}
          <Animated.View
            style={[
              styles.closingContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={[styles.closingText, { color: theme.colors.textSecondary }]}>
              At <Text style={[styles.brandName, { color: theme.colors.neonPurple }]}>GlobalCitizen Prep</Text>, we believe in making learning accessible, efficient, and motivating. Your success is our goal — and we're proud to be part of your path to citizenship.
            </Text>
            
            <Text style={[styles.thankYouText, { color: theme.colors.text }]}>
              Thank you for choosing us. 
              <Text style={[styles.priorityText, { color: theme.colors.neonGreen }]}> Your success is our priority.</Text>
            </Text>
          </Animated.View>

          {/* Cyberpunk border effect */}
          <View style={[
            styles.cyberBorder,
            { borderColor: theme.colors.neonPink }
          ]} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleUnderline: {
    width: 80,
    height: 3,
    marginTop: 10,
    borderRadius: 2,
  },
  contentCard: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 24,
    position: 'relative',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  iconContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  welcomeText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  brandName: {
    fontWeight: '800',
    letterSpacing: 1,
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'left',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureIconText: {
    fontSize: 18,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  closingContainer: {
    marginTop: 8,
  },
  closingText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  thankYouText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  priorityText: {
    fontWeight: '700',
    letterSpacing: 1,
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
}); 