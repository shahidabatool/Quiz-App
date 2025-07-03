import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChapterSelectionScreen from '../screens/ChapterSelectionScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import UKCitizenshipScreen from '../screens/UKCitizenshipScreen';
import UKChaptersScreen from '../screens/UKChaptersScreen';
import UKPracticeModuleScreen from '../screens/UKPracticeModuleScreen';
import UKMockScreen from '../screens/UKMockScreen';
import UKQuizScreen from '../screens/UKQuizScreen';
import UKStudyGuideScreen from '../screens/UKStudyGuideScreen';
import PracticeModuleScreen from '../screens/PracticeModuleScreen';
import CanadianModulesScreen from '../screens/CanadianModulesScreen';
import CanadaStudyGuideScreen from '../screens/CanadaStudyGuideScreen';
import { theme } from '../theme';

// SIMPLE ABOUTUS COMPONENT CREATED RIGHT HERE - NO IMPORT ISSUES!
const AboutUsScreen = () => {
  return (
    <View style={aboutStyles.container}>
      <ScrollView contentContainerStyle={aboutStyles.content}>
        <Text style={aboutStyles.title}>About GlobalCitizen Prep</Text>
        <Text style={aboutStyles.text}>
          Welcome to GlobalCitizen Prep, your trusted companion in preparing for the UK and Canada citizenship tests.
        </Text>
        <Text style={aboutStyles.text}>
          Our mission is simple: to help you succeed by providing high-quality, accurate, and up-to-date practice tools that build your confidence and improve your performance on test day.
        </Text>
        <Text style={aboutStyles.text}>
          Every question in the app is crafted using reliable sources, including official government materials and recognized study guides. We understand how important this milestone is, and we're here to make your preparation journey smoother and more effective.
        </Text>
        <Text style={aboutStyles.sectionTitle}>What GlobalCitizen Prep Offers:</Text>
        <Text style={aboutStyles.feature}>🎯 Mock Test - Experience real exam conditions</Text>
        <Text style={aboutStyles.feature}>✍️ Quiz Mode - Bite-sized quizzes with instant answers</Text>
        <Text style={aboutStyles.feature}>📚 Chapterwise Practice - Study one topic at a time</Text>
        <Text style={aboutStyles.feature}>📖 Official Preparation Material - Access trusted resources</Text>
        <Text style={aboutStyles.text}>
          At GlobalCitizen Prep, we believe in making learning accessible, efficient, and motivating. Your success is our goal — and we're proud to be part of your path to citizenship.
        </Text>
        <Text style={aboutStyles.thanks}>
          Thank you for choosing us. Your success is our priority.
        </Text>
      </ScrollView>
    </View>
  );
};

const aboutStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  text: { fontSize: 16, color: '#ccc', marginBottom: 15, lineHeight: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#8b5cf6', marginTop: 20, marginBottom: 10 },
  feature: { fontSize: 16, color: '#00ff88', marginBottom: 8, paddingLeft: 10 },
  thanks: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 20 }
});

export type RootStackParamList = {
  Home: undefined;
  AboutUs: undefined;
  UKCitizenship: undefined;
  UKChapters: undefined;
  UKPracticeModule: undefined;
  UKMock: undefined;
  UKQuiz: {
    mode: 'practice' | 'test' | 'mock' | 'quiz';
    chapterName: string;
  };
  UKStudyGuide: undefined;
  CanadianModules: undefined;
  CanadaStudyGuide: undefined;
  ChapterSelection: undefined;
  PracticeModule: {
    moduleId: string;
    country: string;
    title: string;
  };
  Quiz: {
    mode: 'practice' | 'test' | 'mock';
    moduleId?: number | string;
    chapterId?: string;
  };
  Results: {
    score: number;
    totalQuestions: number;
    chapter: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer
      onStateChange={(state) => {
        console.log('🔍 Navigation state changed:', state);
        console.log('📋 All registered routes:', state?.routeNames);
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CanadianModules"
          component={CanadianModulesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UKCitizenship"
          component={UKCitizenshipScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UKChapters"
          component={UKChaptersScreen}
          options={{ title: 'UK Practice by Chapter' }}
        />
        <Stack.Screen
          name="UKPracticeModule"
          component={UKPracticeModuleScreen}
          options={{ title: 'UK Practice by Chapter' }}
        />
        <Stack.Screen
          name="UKMock"
          component={UKMockScreen}
          options={{ title: 'UK Mock Test' }}
        />
        <Stack.Screen
          name="UKQuiz"
          component={UKQuizScreen}
          options={{ title: 'UK Quiz' }}
        />
        <Stack.Screen
          name="UKStudyGuide"
          component={UKStudyGuideScreen}
          options={{ title: 'UK Study Guide' }}
        />
        <Stack.Screen
          name="PracticeModule"
          component={PracticeModuleScreen}
          options={{ title: 'Practice Module' }}
        />
        <Stack.Screen
          name="CanadaStudyGuide"
          component={CanadaStudyGuideScreen}
          options={{ title: 'Canada Study Guide' }}
        />
        <Stack.Screen
          name="ChapterSelection"
          component={ChapterSelectionScreen}
          options={{ title: 'Select Chapter' }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={({ route }) => ({
            title: route.params.mode === 'practice' 
              ? 'Practice Quiz'
              : route.params.mode === 'test'
              ? 'Test Mode'
              : 'Mock Exam',
            headerLeft: () => null // Prevent going back during quiz
          })}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ 
            title: 'Quiz Results',
            headerLeft: () => null // Prevent going back from results
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 