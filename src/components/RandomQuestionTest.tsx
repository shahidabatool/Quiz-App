import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getMockExamQuestions, getTestQuestions, getPracticeQuestions } from '../data/questionBank';

export const RandomQuestionTest = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [mode, setMode] = useState<string>('');

  const testMockExam = () => {
    const mockQuestions = getMockExamQuestions();
    setQuestions(mockQuestions);
    setMode('Mock Exam');
  };

  const testPractice = () => {
    const practiceQuestions = getPracticeQuestions('01', 5); // Get 5 questions from chapter 1
    setQuestions(practiceQuestions);
    setMode('Practice');
  };

  const testTest = () => {
    const testQuestions = getTestQuestions();
    setQuestions(testQuestions);
    setMode('Test');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question Selection Test</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Try Mock Exam" onPress={testMockExam} />
        <Button title="Try Practice" onPress={testPractice} />
        <Button title="Try Test" onPress={testTest} />
      </View>

      {questions.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.modeText}>Mode: {mode}</Text>
          <Text style={styles.countText}>Questions Selected: {questions.length}</Text>
          <Text style={styles.sampleText}>Sample Question:</Text>
          <View style={styles.questionBox}>
            <Text>{questions[0].question}</Text>
            {questions[0].options.map((option: string, index: number) => (
              <Text key={index}>• {option}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  results: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  modeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  countText: {
    marginBottom: 10,
  },
  sampleText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  questionBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
}); 