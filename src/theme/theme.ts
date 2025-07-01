export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  notification: string;
  success: string;
  error: string;
  buttonHighlight: string;
  lightBlue: string;
  maple: string;
  gold: string;
  lightRed: string;
  cardShadow: string;
  backgroundSecondary: string;
  // Futuristic additions
  neonBlue: string;
  neonPurple: string;
  neonGreen: string;
  neonPink: string;
  cyberGray: string;
  holographic: string;
  glass: string;
  glow: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#6366f1', // Modern indigo
    secondary: '#8b5cf6', // Purple
    accent: '#06b6d4', // Cyan
    background: '#fafafa', // Very light gray
    backgroundSecondary: '#f1f5f9', // Slate 100
    card: '#ffffff', // Pure white
    text: '#0f172a', // Slate 900
    textSecondary: '#64748b', // Slate 500
    border: '#e2e8f0', // Slate 200
    notification: '#ef4444', // Red 500
    success: '#10b981', // Emerald 500
    error: '#ef4444', // Red 500
    buttonHighlight: '#4f46e5', // Indigo 600
    lightBlue: '#dbeafe', // Blue 100
    maple: '#dc2626', // Red 600
    gold: '#f59e0b', // Amber 500
    lightRed: 'rgba(239, 68, 68, 0.1)',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    // Futuristic additions
    neonBlue: '#3b82f6',
    neonPurple: '#8b5cf6',
    neonGreen: '#10b981',
    neonPink: '#ec4899',
    cyberGray: '#6b7280',
    holographic: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    glass: 'rgba(255, 255, 255, 0.25)',
    glow: 'rgba(99, 102, 241, 0.3)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#8b5cf6', // Purple
    secondary: '#06b6d4', // Cyan
    accent: '#f59e0b', // Amber
    background: '#0a0a0a', // Near black
    backgroundSecondary: '#1a1a1a', // Dark gray
    card: '#1e1e1e', // Dark card
    text: '#ffffff', // White
    textSecondary: '#a1a1aa', // Zinc 400
    border: '#27272a', // Zinc 800
    notification: '#f87171', // Red 400
    success: '#34d399', // Emerald 400
    error: '#f87171', // Red 400
    buttonHighlight: '#a855f7', // Purple 500
    lightBlue: 'rgba(59, 130, 246, 0.2)',
    maple: '#f87171', // Red 400
    gold: '#fbbf24', // Amber 400
    lightRed: 'rgba(248, 113, 113, 0.2)',
    cardShadow: 'rgba(0, 0, 0, 0.4)',
    // Futuristic additions
    neonBlue: '#60a5fa',
    neonPurple: '#a855f7',
    neonGreen: '#34d399',
    neonPink: '#f472b6',
    cyberGray: '#9ca3af',
    holographic: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
    glass: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(139, 92, 246, 0.4)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
};

// Legacy theme export for backward compatibility
export const theme = lightTheme;

export const themeColors = {
  primary: '#D12C1F', // Canadian Red
  secondary: '#FFFFFF', // White
  accent: '#FFC107', // A warm yellow/gold as an accent
  background: '#F8F9FA', // A very light grey for backgrounds
  backgroundSecondary: '#E9ECEF', // Slightly darker grey for variation
  textPrimary: '#212529', // Dark grey for primary text
  textSecondary: '#6C757D', // Lighter grey for secondary text
  success: '#28A745', // Green for correct answers
  error: '#DC3545',   // Red for incorrect answers (can be same as primary)
  buttonHighlight: '#b02418', // Darker red for button press
  lightBlue: '#d0e0ff', // For selected options before feedback
  maple: '#FF0000', // Bright red for maple leaf
  gold: '#FFD700', // Gold accent
  lightRed: 'rgba(209, 44, 31, 0.1)', // Light red background
  cardShadow: 'rgba(0, 0, 0, 0.1)', // Card shadow color
  border: 'rgba(0, 0, 0, 0.05)', // Light border color
};

export const gradients = {
  primary: ['#6366f1', '#8b5cf6'], // Indigo to Purple
  secondary: ['#06b6d4', '#0891b2'], // Cyan gradient
  accent: ['#f59e0b', '#d97706'], // Amber gradient
  success: ['#10b981', '#059669'], // Emerald gradient
  cyber: ['#6366f1', '#8b5cf6', '#06b6d4'], // Cyber gradient
  neon: ['#3b82f6', '#8b5cf6', '#ec4899'], // Neon gradient
};

export const darkGradients = {
  primary: ['#8b5cf6', '#a855f7'], // Purple gradient
  secondary: ['#06b6d4', '#0891b2'], // Cyan gradient
  accent: ['#f59e0b', '#d97706'], // Amber gradient
  success: ['#34d399', '#10b981'], // Emerald gradient
  cyber: ['#8b5cf6', '#06b6d4', '#f59e0b'], // Cyber gradient
  neon: ['#60a5fa', '#a855f7', '#f472b6'], // Neon gradient
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  cardStyle: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
}; 