import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import { getChapters, getQuestionsForChapter } from '../utils/questionUtils';

const PracticeModuleScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [chapters, setChapters] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChaptersWithCounts = async () => {
      const chapterNames = await getChapters();
      const chaptersWithCounts = await Promise.all(
        chapterNames.map(async (name) => {
          const questions = await getQuestionsForChapter(name);
          return { name, count: questions.length };
        })
      );
      setChapters(chaptersWithCounts);
      setLoading(false);
    };
    
    loadChaptersWithCounts();
  }, []);

  const handleChapterSelect = async (chapterName: string) => {
    const chapterQuestions = await getQuestionsForChapter(chapterName);
    navigation.navigate('Quiz', {
      questions: chapterQuestions,
      mode: 'practice',
      chapterName
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Canada Practice Modules</Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        Select a chapter to practice questions from that topic.
      </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{marginTop: 40}} />
      ) : (
        <View style={styles.chaptersContainer}>
          {chapters.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.chapterButton, { 
                backgroundColor: theme.colors.card,
                shadowColor: theme.colors.cardShadow,
              }]}
              onPress={() => handleChapterSelect(chapter.name)}
            >
              <Text style={[styles.chapterName, { color: theme.colors.text }]}>{chapter.name}</Text>
              <Text style={[styles.questionCount, { color: theme.colors.textSecondary }]}>
                {chapter.count} questions
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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

export default PracticeModuleScreen; 