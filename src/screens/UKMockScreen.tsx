import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import questions from '../../assets/uk_questions_extended.json';

const UKMockScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all questions from all chapters
    const allQuestions = questions[0].chapters.reduce((acc: any[], chapter: any) => {
      return [...acc, ...chapter.questions];
    }, []);

    // Randomly select 24 questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 24);

    // Automatically start the mock test
    if (selected.length > 0) {
      navigation.replace('UKQuiz', {
        questions: selected,
        mode: 'mock',
        chapterName: 'UK Mock Test'
      });
    }
  }, [navigation]);

  // Show loading screen while preparing questions
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UKMockScreen; 