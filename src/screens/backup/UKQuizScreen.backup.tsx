import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

const UKQuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { questions, mode, chapterName } = route.params as { 
    questions: Question[],
    mode: 'practice' | 'mock' | 'quiz',
    chapterName: string 
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (question.correct_answer === selectedAnswers[index]) {
        correctAnswers++;
      }
    });
    return {
      score: correctAnswers,
      percentage: (correctAnswers / questions.length) * 100,
      passed: (correctAnswers / questions.length) * 100 >= 75
    };
  };

  if (showResults) {
    const { score, percentage, passed } = calculateScore();
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Quiz Results</Text>
        <View style={styles.resultsContainer}>
          <Text style={styles.scoreText}>
            Score: {score}/{questions.length} ({percentage.toFixed(1)}%)
          </Text>
          <Text style={[styles.passFailText, passed ? styles.passedText : styles.failedText]}>
            {passed ? 'PASSED!' : 'FAILED'}
          </Text>
          
          <Text style={styles.reviewTitle}>Review Your Answers:</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text style={styles.questionText}>{question.question}</Text>
              <Text style={styles.answerText}>
                Your answer: {selectedAnswers[index] || 'Not answered'}
              </Text>
              <Text style={[
                styles.answerText,
                selectedAnswers[index] === question.correct_answer
                  ? styles.correctAnswer
                  : styles.wrongAnswer
              ]}>
                Correct answer: {question.correct_answer}
              </Text>
            </View>
          ))}
          
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.returnButtonText}>Return to {mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.moduleTitle}>{chapterName}</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]}
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswers[currentQuestionIndex] === option && styles.selectedOption
              ]}
              onPress={() => handleAnswerSelect(option)}
            >
              <Text style={[
                styles.optionText,
                selectedAnswers[currentQuestionIndex] === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestionIndex === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navButton, !selectedAnswers[currentQuestionIndex] && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]}
        >
          <Text style={styles.navButtonText}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  selectedOption: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedOptionText: {
    color: '#fff',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
    opacity: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreText: {
    fontSize: 24,
    color: '#2c3e50',
    marginBottom: 12,
  },
  passFailText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  passedText: {
    color: '#27ae60',
  },
  failedText: {
    color: '#c0392b',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  answerText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 8,
  },
  correctAnswer: {
    color: '#27ae60',
  },
  wrongAnswer: {
    color: '#c0392b',
  },
  returnButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UKQuizScreen; 