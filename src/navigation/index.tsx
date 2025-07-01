import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

export type RootStackParamList = {
  Home: undefined;
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
    <NavigationContainer>
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
          name="UKCitizenship"
          component={UKCitizenshipScreen}
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
          name="CanadianModules"
          component={CanadianModulesScreen}
          options={{ headerShown: false }}
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