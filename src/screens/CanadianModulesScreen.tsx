import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import { RootStackParamList } from '../types';

// About Us Component 
const AboutUsContent = ({ theme }: any) => (
  <View style={[styles.aboutContainer, { backgroundColor: theme.colors.background }]}>
    <Text style={[styles.aboutTitle, { color: theme.colors.text }]}>About GlobalCitizen Prep</Text>
    
    <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
      Welcome to GlobalCitizen Prep, your trusted companion in preparing for the UK and Canada citizenship tests.
    </Text>
    
    <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
      Our mission is simple: to help you succeed by providing high-quality, accurate, and up-to-date practice tools that build your confidence and improve your performance on test day.
    </Text>
    
    <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
      Every question in the app is crafted using reliable sources, including official government materials and recognized study guides. We understand how important this milestone is, and we're here to make your preparation journey smoother and more effective.
    </Text>
    
    <Text style={[styles.aboutSectionTitle, { color: theme.colors.primary }]}>What GlobalCitizen Prep Offers:</Text>
    
    <Text style={[styles.aboutFeature, { color: theme.colors.textSecondary }]}>🎯 Mock Test - Experience real exam conditions with timed, full-length simulations</Text>
    <Text style={[styles.aboutFeature, { color: theme.colors.textSecondary }]}>✍️ Quiz Mode - Engage with bite-sized quizzes that offer instant, explained answers</Text>
    <Text style={[styles.aboutFeature, { color: theme.colors.textSecondary }]}>📚 Chapterwise Practice - Study one topic at a time with structured questions</Text>
    <Text style={[styles.aboutFeature, { color: theme.colors.textSecondary }]}>📖 Official Preparation Material - Access trusted PDF resources for full study</Text>
    
    <Text style={[styles.aboutClosing, { color: theme.colors.textSecondary }]}>
      At GlobalCitizen Prep, we believe in making learning accessible, efficient, and motivating. Your success is our goal — and we're proud to be part of your path to citizenship.
    </Text>
    
    <Text style={[styles.aboutThanks, { color: theme.colors.text }]}>
      Thank you for choosing us. Your success is our priority.
    </Text>
  </View>
);

const modules = [
  {
    id: 1,
    title: 'Applying for Citizenship',
    icon: '📝',
    description: 'Learn about the citizenship application process',
    page: 6
  },
  {
    id: 2,
    title: 'Rights and Responsibilities',
    icon: '⚖️',
    description: 'Understand your rights and duties as a citizen',
    page: 8
  },
  {
    id: 3,
    title: 'Who We Are',
    icon: '🤝',
    description: 'Learn about Canadian identity and values',
    page: 10
  },
  {
    id: 4,
    title: "Canada's History",
    icon: '📚',
    description: 'Explore the history of Canada',
    page: 14
  },
  {
    id: 5,
    title: 'Modern Canada',
    icon: '🏙️',
    description: 'Understanding contemporary Canada',
    page: 24
  },
  {
    id: 6,
    title: 'How Canadians Govern Themselves',
    icon: '🏛️',
    description: 'Learn about Canadian democracy and government',
    page: 28
  },
  {
    id: 7,
    title: 'Federal Elections',
    icon: '🗳️',
    description: 'Understanding the electoral system',
    page: 30
  },
  {
    id: 8,
    title: 'The Justice System',
    icon: '⚖️',
    description: 'Learn about law and justice in Canada',
    page: 36
  },
  {
    id: 9,
    title: 'Canadian Symbols',
    icon: '🍁',
    description: 'Important symbols of Canadian identity',
    page: 38
  },
  {
    id: 10,
    title: "Canada's Economy",
    icon: '💰',
    description: 'Understanding the Canadian economic system',
    page: 42
  },
  {
    id: 11,
    title: "Canada's Regions",
    icon: '🗺️',
    description: 'Learn about different regions of Canada',
    page: 44,
    submodules: [
      {
        id: '11.1',
        title: 'The Atlantic Provinces',
        icon: '🌊',
        page: 46
      },
      {
        id: '11.2',
        title: 'Central Canada',
        icon: '🏙️',
        page: 47
      },
      {
        id: '11.3',
        title: 'The Prairie Provinces',
        icon: '🌾',
        page: 48
      },
      {
        id: '11.4',
        title: 'The West Coast',
        icon: '🏔️',
        page: 49
      },
      {
        id: '11.5',
        title: 'The Northern Territories',
        icon: '❄️',
        page: 50
      }
    ]
  }
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CanadianModulesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  
  // Check if we should show About Us content instead
  const showAboutUs = (route.params as any)?.showAboutUs;
  
  // Update header title if showing About Us
  React.useEffect(() => {
    if (showAboutUs) {
      navigation.setOptions({
        title: 'About Us',
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      });
    } else {
      navigation.setOptions({
        title: 'Canadian Citizenship',
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      });
    }
  }, [showAboutUs, navigation, theme]);
  
  if (showAboutUs) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <AboutUsContent theme={theme} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Practice by Chapter Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('PracticeModule', {
            moduleId: 'practice',
            country: 'canada',
            title: 'Practice by Chapter'
          })}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>📚</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Practice by Chapter</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>Study specific topics with detailed explanations</Text>
          </View>
        </TouchableOpacity>

        {/* Mock Test Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('Quiz', { country: 'canada', mode: 'mock' })}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>🎯</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Mock Test</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>45-minute simulation of the real citizenship test</Text>
          </View>
        </TouchableOpacity>

        {/* Quiz Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('Quiz', { country: 'canada', mode: 'quiz' })}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>✍️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quiz</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>45-minute practice test with unique questions</Text>
          </View>
        </TouchableOpacity>

        {/* Study Guide Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('CanadaStudyGuide')}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>📖</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Study Guide</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>Read the official Discover Canada guide</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  // About Us styles
  aboutContainer: {
    padding: 20,
    paddingTop: 40,
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'left',
  },
  aboutSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  aboutFeature: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
    paddingLeft: 10,
  },
  aboutClosing: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  aboutThanks: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
}); 