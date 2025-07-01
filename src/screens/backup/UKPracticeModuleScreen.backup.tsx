import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import questions from '../../assets/uk_questions.json';

const UKPracticeModuleScreen = () => {
  const navigation = useNavigation();

  const handleChapterSelect = (chapterQuestions: any[], chapterName: string) => {
    navigation.navigate('UKQuiz', {
      questions: chapterQuestions,
      mode: 'practice',
      chapterName
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>UK Practice Modules</Text>
      <Text style={styles.description}>
        Select a chapter to practice questions from that topic.
      </Text>

      <View style={styles.chaptersContainer}>
        {questions[0].chapters.map((chapter: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.chapterButton}
            onPress={() => handleChapterSelect(chapter.questions, chapter.chapterName)}
          >
            <Text style={styles.chapterName}>{chapter.chapterName}</Text>
            <Text style={styles.questionCount}>
              {chapter.questions.length} questions
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  chaptersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  chapterButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chapterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default UKPracticeModuleScreen; 