import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CanadianCitizenshipScreen from './src/screens/CanadianCitizenshipScreen';
import UKCitizenshipScreen from './src/screens/UKCitizenshipScreen';
import PracticeModuleScreen from './src/screens/PracticeModuleScreen';
import MockScreen from './src/screens/MockScreen';
import QuizScreen from './src/screens/QuizScreen';
import UKPracticeModuleScreen from './src/screens/UKPracticeModuleScreen';
import UKMockScreen from './src/screens/UKMockScreen';
import UKQuizScreen from './src/screens/UKQuizScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Citizenship Test App' }}
        />
        <Stack.Screen 
          name="CanadianCitizenship" 
          component={CanadianCitizenshipScreen}
          options={{ title: 'Canadian Citizenship' }}
        />
        <Stack.Screen 
          name="UKCitizenship" 
          component={UKCitizenshipScreen}
          options={{ title: 'UK Citizenship' }}
        />
        <Stack.Screen 
          name="PracticeModule" 
          component={PracticeModuleScreen}
          options={{ title: 'Practice Modules' }}
        />
        <Stack.Screen 
          name="Mock" 
          component={MockScreen}
          options={{ title: 'Mock Test' }}
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen 
          name="UKPracticeModule" 
          component={UKPracticeModuleScreen}
          options={{ title: 'UK Practice Modules' }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 