import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import questions from '../../assets/uk_questions_extended.json';

const UKPracticeModuleScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const handleChapterSelect = (chapterQuestions: any[], chapterName: string) => {
    navigation.navigate('UKQuiz', {
      mode: 'practice',
      chapterName
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>UK Practice Modules</Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        Select a chapter to practice questions from that topic.
      </Text>

      <View style={styles.chaptersContainer}>
        {questions[0].chapters.map((chapter: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={[styles.chapterButton, { 
              backgroundColor: theme.colors.card,
              shadowColor: theme.colors.cardShadow,
            }]}
            onPress={() => handleChapterSelect(chapter.questions, chapter.chapterName)}
          >
            <Text style={[styles.chapterName, { color: theme.colors.text }]}>{chapter.chapterName}</Text>
            <Text style={[styles.questionCount, { color: theme.colors.textSecondary }]}>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  chaptersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  chapterButton: {
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chapterName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
  },
});

export default UKPracticeModuleScreen; 