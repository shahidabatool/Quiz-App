export const theme = {
  colors: {
    primary: '#1D4F91', // Royal Blue
    secondary: '#757575',
    accent: '#C8102E', // UK Red
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#212121',
    border: '#E0E0E0',
    notification: '#D32F2F',
    success: '#4CAF50', // Green for correct answers
    error: '#f44336', // Red for incorrect answers
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

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
  primary: ['#D12C1F', '#b02418'], // Red gradient
  secondary: ['#FFFFFF', '#F8F9FA'], // White to light grey
  accent: ['#FFC107', '#FFB300'], // Gold gradient
  success: ['#28A745', '#20A73C'], // Green gradient
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