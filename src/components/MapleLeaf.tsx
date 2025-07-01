import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MapleLeafProps {
  color?: string;
  width?: number | string;
  height?: number | string;
  style?: any;
}

const MapleLeaf: React.FC<MapleLeafProps> = ({ 
  color = '#D12C1F', // Default Canadian Red
  width = 100, 
  height = 100,
  style 
}) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 512 512" // This viewBox is an example, may need adjustment based on path data
      style={style}
    >
      {/* A simplified generic maple leaf path - replace with a better one if available */}
      <Path 
        fill={color}
        // Example Path - this is a placeholder and might not look perfect
        // A real path from a good SVG source would be much longer and more complex
        d="M448 224c0-12.17-4.38-23.32-11.88-32.37l-25.88-31.06c-1.67-2-3.65-3.78-5.86-5.24-29.8-19.87-69.28-29.33-112.38-29.33s-82.58 9.46-112.38 29.33c-2.21 1.46-4.19 3.24-5.86 5.24l-25.88 31.06C68.38 200.68 64 211.83 64 224c0 35.35 28.65 64 64 64h32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96h32c35.35 0 64-28.65 64-64zM256 448c-8.84 0-16-7.16-16-16V304h-48c-8.84 0-16-7.16-16-16s7.16-16 16-16h48v-48c0-8.84 7.16-16 16-16s16 7.16 16 16v48h48c8.84 0 16 7.16 16 16s-7.16 16-16 16h-48v128c0 8.84-7.16 16-16 16z"
      />
    </Svg>
  );
};

export default MapleLeaf; 