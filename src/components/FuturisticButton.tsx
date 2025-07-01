import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { lightTheme, darkTheme } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

interface FuturisticButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: any;
  textStyle?: any;
}

const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  // Continuous pulse animation
  useEffect(() => {
    if (!disabled) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
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
    }
  }, [disabled]);

  const getVariantColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: theme.colors.neonPurple,
          border: theme.colors.neonPink,
          text: theme.colors.text,
          glow: theme.colors.neonPurple,
        };
      case 'success':
        return {
          background: theme.colors.neonGreen,
          border: theme.colors.neonGreen,
          text: theme.colors.text,
          glow: theme.colors.neonGreen,
        };
      case 'danger':
        return {
          background: theme.colors.error,
          border: theme.colors.neonPink,
          text: theme.colors.text,
          glow: theme.colors.error,
        };
      default:
        return {
          background: theme.colors.neonBlue,
          border: theme.colors.neonGreen,
          text: theme.colors.text,
          glow: theme.colors.neonBlue,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
          borderRadius: 12,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
          fontSize: 18,
          borderRadius: 20,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16,
          borderRadius: 16,
        };
    }
  };

  const colors = getVariantColors();
  const sizeStyles = getSizeStyles();

  const handlePressIn = () => {
    if (!disabled) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const glowStyle = {
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.8],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 16],
    }),
  };

  const borderStyle = {
    borderWidth: borderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 3],
    }),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.9}
      style={[style]}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: disabled ? theme.colors.cyberGray : colors.background,
            borderColor: colors.border,
            paddingVertical: sizeStyles.paddingVertical,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            borderRadius: sizeStyles.borderRadius,
            opacity: disabled ? 0.5 : 1,
          },
          glowStyle,
          borderStyle,
        ]}
      >
        {/* Inner glow effect */}
        <View style={[
          styles.innerGlow,
          {
            backgroundColor: colors.glow,
            borderRadius: sizeStyles.borderRadius - 2,
          }
        ]} />

        {/* Futuristic pattern overlay */}
        <View style={[
          styles.patternOverlay,
          {
            borderRadius: sizeStyles.borderRadius - 2,
          }
        ]} />

        {/* Button content */}
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontSize: sizeStyles.fontSize,
                fontWeight: '700',
                letterSpacing: 1,
              },
              textStyle,
            ]}
          >
            {title.toUpperCase()}
          </Text>

          {/* Futuristic accent line */}
          <View style={[
            styles.accentLine,
            {
              backgroundColor: colors.glow,
            }
          ]} />
        </Animated.View>

        {/* Cyberpunk border effect */}
        <View style={[
          styles.cyberBorder,
          {
            borderColor: colors.border,
            borderRadius: sizeStyles.borderRadius,
          }
        ]} />

        {/* Corner accents */}
        <View style={[
          styles.cornerAccent,
          {
            borderColor: colors.glow,
            top: 4,
            left: 4,
          }
        ]} />
        <View style={[
          styles.cornerAccent,
          {
            borderColor: colors.glow,
            top: 4,
            right: 4,
          }
        ]} />
        <View style={[
          styles.cornerAccent,
          {
            borderColor: colors.glow,
            bottom: 4,
            left: 4,
          }
        ]} />
        <View style={[
          styles.cornerAccent,
          {
            borderColor: colors.glow,
            bottom: 4,
            right: 4,
          }
        ]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
    overflow: 'hidden',
  },
  innerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  text: {
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accentLine: {
    width: 20,
    height: 2,
    marginTop: 4,
    borderRadius: 1,
  },
  cyberBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderWidth: 1,
    opacity: 0.6,
  },
  cornerAccent: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderWidth: 1,
    opacity: 0.8,
  },
});

export default FuturisticButton; 