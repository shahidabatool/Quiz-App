import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CanadianModulesScreen from './src/screens/CanadianModulesScreen';
import UKCitizenshipScreen from './src/screens/UKCitizenshipScreen';
import UKChaptersScreen from './src/screens/UKChaptersScreen';
import PracticeModuleScreen from './src/screens/PracticeModuleScreen';
import QuizScreen from './src/screens/QuizScreen';
import UKPracticeModuleScreen from './src/screens/UKPracticeModuleScreen';
import UKQuizScreen from './src/screens/UKQuizScreen';
import UKMockScreen from './src/screens/UKMockScreen';
import CanadaStudyGuideScreen from './src/screens/CanadaStudyGuideScreen';
import UKStudyGuideScreen from './src/screens/UKStudyGuideScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { lightTheme, darkTheme } from './src/theme/theme';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    contentStyle: { 
      backgroundColor: theme.colors.background 
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="Home"
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CanadianModules" 
          component={CanadianModulesScreen}
          options={{ title: 'Canadian Citizenship' }}
        />
        <Stack.Screen 
          name="UKCitizenship" 
          component={UKCitizenshipScreen}
          options={{ title: 'UK Citizenship' }}
        />
        <Stack.Screen 
          name="UKChapters" 
          component={UKChaptersScreen}
          options={{ title: 'UK Chapters' }}
        />
        <Stack.Screen 
          name="PracticeModule" 
          component={PracticeModuleScreen}
          options={({ route }) => ({ 
            title: route.params?.title || 'Practice Module'
          })}
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen}
          options={({ route }) => ({ 
            title: route.params?.mode === 'mock' ? 'Mock Test' : 
                  route.params?.mode === 'practice' ? route.params?.chapterName : 
                  'Quiz'
          })}
        />
        <Stack.Screen 
          name="UKPracticeModule" 
          component={UKPracticeModuleScreen}
          options={{ title: 'UK Practice Modules' }}
        />
        <Stack.Screen 
          name="UKQuiz" 
          component={UKQuizScreen}
          options={({ route }) => ({ 
            title: route.params?.mode === 'mock' ? 'UK Mock Test' : 
                  route.params?.mode === 'practice' ? route.params?.chapterName : 
                  'UK Quiz'
          })}
        />
        <Stack.Screen 
          name="UKMock" 
          component={UKMockScreen}
          options={{ title: 'UK Mock Test' }}
        />
        <Stack.Screen 
          name="CanadaStudyGuide" 
          component={CanadaStudyGuideScreen}
          options={{ title: 'Discover Canada' }}
        />
        <Stack.Screen 
          name="UKStudyGuide" 
          component={UKStudyGuideScreen}
          options={{ title: 'Life in the UK' }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{ title: 'Results' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
