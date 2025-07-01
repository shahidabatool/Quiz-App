import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import questions from '../../assets/uk_questions.json';

const UKMockScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [mockQuestions, setMockQuestions] = useState<any[]>([]);

  useEffect(() => {
    // Get all questions from all chapters
    const allQuestions = questions[0].chapters.reduce((acc: any[], chapter: any) => {
      return [...acc, ...chapter.questions];
    }, []);

    // Randomly select 20 questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);

    setMockQuestions(selected);
    setLoading(false);
  }, []);

  const startMockTest = () => {
    if (mockQuestions.length === 0) {
      return; // Don't start if no questions are loaded
    }
    
    navigation.navigate('UKQuiz', {
      questions: mockQuestions,
      mode: 'mock',
      chapterName: 'UK Mock Test'
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UK Mock Test</Text>
      <Text style={styles.description}>
        This mock test contains 20 random questions from all chapters.
        You need to score at least 75% (15 correct answers) to pass.
      </Text>
      <TouchableOpacity 
        style={[styles.startButton, mockQuestions.length === 0 && styles.disabledButton]} 
        onPress={startMockTest}
        disabled={mockQuestions.length === 0}
      >
        <Text style={styles.startButtonText}>Start UK Mock Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#95a5a6',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UKMockScreen; 