import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';

export default function UKCitizenshipScreen() {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Practice by Chapter Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('UKPracticeModule')}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>📚</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Practice by Chapter</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>Study specific topics with detailed explanations</Text>
          </View>
        </TouchableOpacity>

        {/* Mock Test Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('UKMock')}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>🎯</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Mock Test</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>45-minute simulation of the real citizenship test</Text>
          </View>
        </TouchableOpacity>

        {/* Quiz Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('UKQuiz', { mode: 'quiz', chapterName: 'UK Quiz' })}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>✍️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quiz</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>Practice test with random questions</Text>
          </View>
        </TouchableOpacity>

        {/* Study Guide Section */}
        <TouchableOpacity 
          style={[styles.sectionContainer, { 
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.cardShadow,
          }]}
          onPress={() => navigation.navigate('UKStudyGuide')}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={styles.icon}>📖</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Study Guide</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>Read the official Life in the UK guide</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 