import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadCanadaQuestions } from '../utils/questionUtils';

const MockScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareMockTest = async () => {
      try {
        // Load Canada questions from the same source as other modes
        const canadaData = await loadCanadaQuestions();
        
        if (!canadaData || !canadaData.chapters) {
          console.error('Failed to load Canada questions for mock test');
          return;
        }

        // Get all questions from all chapters
        let allQuestions: any[] = [];
        canadaData.chapters.forEach((chapter) => {
          allQuestions.push(...chapter.questions.map(q => ({
            id: q.id.toString(),
            moduleId: chapter.chapterName,
            question: q.question,
            answers: q.options,
            options: q.options,
            correctAnswer: q.correct_answer,
            explanation: q.explanation
          })));
        });

        // Randomly select 20 questions for mock test
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 20);

        // Automatically start the mock test
        if (selected.length > 0) {
          navigation.replace('Quiz', {
            questions: selected,
            mode: 'mock',
            country: 'canada',
            chapterName: 'Canada Mock Test'
          });
        }
      } catch (error) {
        console.error('Error preparing mock test:', error);
      }
    };

    prepareMockTest();
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

export default MockScreen; 