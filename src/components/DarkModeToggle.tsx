import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';

const DarkModeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  
  // Animation values
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Continuous pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
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
    return () => pulse.stop();
  }, []);

  const handleToggle = () => {
    // Complex animation sequence
    Animated.parallel([
      // Rotation animation
      Animated.timing(rotateAnim, {
        toValue: rotateAnim._value + 360,
        duration: 600,
        useNativeDriver: true,
      }),
      // Scale animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      // Glow animation
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      // Slide animation
      Animated.timing(slideAnim, {
        toValue: isDark ? 0 : 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    toggleTheme();
  };

  const rotateStyle = {
    transform: [
      { rotate: rotateAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
      })},
      { scale: scaleAnim },
    ],
  };

  const glowStyle = {
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    }),
  };

  const slideStyle = {
    transform: [{
      translateX: slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 24],
      }),
    }],
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        DARK MODE
      </Text>
      
      <TouchableOpacity
        onPress={handleToggle}
        style={[
          styles.toggleContainer,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.neonPurple,
          }
        ]}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.toggleBackground,
            {
              backgroundColor: isDark 
                ? theme.colors.neonPurple 
                : theme.colors.neonBlue,
            },
            rotateStyle,
            glowStyle,
          ]}
        >
          {/* Futuristic pattern overlay */}
          <View style={styles.patternOverlay} />
          
          {/* Animated toggle handle */}
          <Animated.View
            style={[
              styles.toggleHandle,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.neonGreen,
              },
              slideStyle,
            ]}
          >
            {/* Inner glow effect */}
            <View style={[
              styles.innerGlow,
              {
                backgroundColor: isDark 
                  ? theme.colors.neonPurple 
                  : theme.colors.neonBlue,
              }
            ]} />
            
            {/* Icon */}
            <Text style={styles.icon}>
              {isDark ? '🌙' : '☀️'}
            </Text>
          </Animated.View>
          
          {/* Status indicators */}
          <View style={styles.statusIndicators}>
            <View style={[
              styles.indicator,
              {
                backgroundColor: isDark 
                  ? theme.colors.neonPurple 
                  : theme.colors.cyberGray,
              }
            ]} />
            <View style={[
              styles.indicator,
              {
                backgroundColor: !isDark 
                  ? theme.colors.neonBlue 
                  : theme.colors.cyberGray,
              }
            ]} />
          </View>
        </Animated.View>
        
        {/* Cyberpunk border effect */}
        <View style={[
          styles.cyberBorder,
          {
            borderColor: theme.colors.neonPink,
          }
        ]} />
      </TouchableOpacity>
      
      {/* Floating particles effect */}
      <View style={styles.particlesContainer}>
        {[...Array(6)].map((_, i) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  toggleContainer: {
    width: 60,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  toggleBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'relative',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
  toggleHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 2,
    left: 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  innerGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: 0.3,
  },
  icon: {
    fontSize: 12,
    zIndex: 1,
  },
  statusIndicators: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  cyberBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 18,
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
    width: 2,
    height: 2,
    borderRadius: 1,
    opacity: 0.6,
  },
});

export default DarkModeToggle; 