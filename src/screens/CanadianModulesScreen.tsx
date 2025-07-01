import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import { RootStackParamList } from '../types';

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
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

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
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>30-minute simulation of the real citizenship test</Text>
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
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>30-minute practice test with random questions</Text>
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
}); 