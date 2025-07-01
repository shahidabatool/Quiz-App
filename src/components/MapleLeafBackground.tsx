import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface MapleLeafBackgroundProps {
  opacity?: number;
}

const MapleLeafBackground: React.FC<MapleLeafBackgroundProps> = ({ opacity = 0.05 }) => {
  return (
    <View style={styles.container}>
      {/* Large background maple leaf */}
      <View style={[styles.leafContainer, styles.mainLeaf]}>
        <Svg width={300} height={300} viewBox="0 0 24 24">
          <Defs>
            <LinearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FF0000" stopOpacity={opacity} />
              <Stop offset="50%" stopColor="#CC0000" stopOpacity={opacity * 0.8} />
              <Stop offset="100%" stopColor="#990000" stopOpacity={opacity * 0.6} />
            </LinearGradient>
          </Defs>
          <Path
            d="M12 2c1.5 2 3 3.5 5 3.5s3.5-1 4-2.5c-.5 2-1.5 4-3.5 5.5 1.5 1 3 2.5 3.5 4.5-1.5-1-3-1.5-4.5-1 .5 2 .5 4 0 6-1-1.5-2-3.5-2-5.5 0 2-1 4-2 5.5 0-2 -.5-4 0-6-1.5.5-3 0-4.5 1 .5-2 2-3.5 3.5-4.5-2-1.5-3-3.5-3.5-5.5.5 1.5 2 2.5 4 2.5s3.5-1.5 5-3.5z"
            fill="url(#leafGradient)"
          />
        </Svg>
      </View>

      {/* Smaller decorative maple leaves */}
      <View style={[styles.leafContainer, styles.topRightLeaf]}>
        <Svg width={120} height={120} viewBox="0 0 24 24">
          <Path
            d="M12 2c1.5 2 3 3.5 5 3.5s3.5-1 4-2.5c-.5 2-1.5 4-3.5 5.5 1.5 1 3 2.5 3.5 4.5-1.5-1-3-1.5-4.5-1 .5 2 .5 4 0 6-1-1.5-2-3.5-2-5.5 0 2-1 4-2 5.5 0-2 -.5-4 0-6-1.5.5-3 0-4.5 1 .5-2 2-3.5 3.5-4.5-2-1.5-3-3.5-3.5-5.5.5 1.5 2 2.5 4 2.5s3.5-1.5 5-3.5z"
            fill={`rgba(255, 0, 0, ${opacity * 0.3})`}
          />
        </Svg>
      </View>

      <View style={[styles.leafContainer, styles.bottomLeftLeaf]}>
        <Svg width={150} height={150} viewBox="0 0 24 24">
          <Path
            d="M12 2c1.5 2 3 3.5 5 3.5s3.5-1 4-2.5c-.5 2-1.5 4-3.5 5.5 1.5 1 3 2.5 3.5 4.5-1.5-1-3-1.5-4.5-1 .5 2 .5 4 0 6-1-1.5-2-3.5-2-5.5 0 2-1 4-2 5.5 0-2 -.5-4 0-6-1.5.5-3 0-4.5 1 .5-2 2-3.5 3.5-4.5-2-1.5-3-3.5-3.5-5.5.5 1.5 2 2.5 4 2.5s3.5-1.5 5-3.5z"
            fill={`rgba(255, 0, 0, ${opacity * 0.25})`}
          />
        </Svg>
      </View>

      <View style={[styles.leafContainer, styles.centerRightLeaf]}>
        <Svg width={80} height={80} viewBox="0 0 24 24">
          <Path
            d="M12 2c1.5 2 3 3.5 5 3.5s3.5-1 4-2.5c-.5 2-1.5 4-3.5 5.5 1.5 1 3 2.5 3.5 4.5-1.5-1-3-1.5-4.5-1 .5 2 .5 4 0 6-1-1.5-2-3.5-2-5.5 0 2-1 4-2 5.5 0-2 -.5-4 0-6-1.5.5-3 0-4.5 1 .5-2 2-3.5 3.5-4.5-2-1.5-3-3.5-3.5-5.5.5 1.5 2 2.5 4 2.5s3.5-1.5 5-3.5z"
            fill={`rgba(255, 0, 0, ${opacity * 0.2})`}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: -1,
  },
  leafContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLeaf: {
    top: height * 0.3,
    left: width * 0.2,
    transform: [{ rotate: '15deg' }],
  },
  topRightLeaf: {
    top: height * 0.1,
    right: width * 0.1,
    transform: [{ rotate: '-30deg' }],
  },
  bottomLeftLeaf: {
    bottom: height * 0.2,
    left: width * 0.05,
    transform: [{ rotate: '45deg' }],
  },
  centerRightLeaf: {
    top: height * 0.45,
    right: width * 0.15,
    transform: [{ rotate: '-15deg' }],
  },
});

export default MapleLeafBackground; 