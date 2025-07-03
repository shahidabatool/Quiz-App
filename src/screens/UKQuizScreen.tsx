import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import FuturisticButton from '../components/FuturisticButton';
import questions from '../../assets/uk_questions_extended.json';

const { width, height } = Dimensions.get('window');

const UKQuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode, chapterName } = route.params as { 
    mode: 'practice' | 'mock' | 'quiz',
    chapterName: string 
  };

  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Entrance animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Glow animation
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    );
    glow.start();

    return () => {
      pulse.stop();
      glow.stop();
    };
  }, []);

  // Progress animation
  useEffect(() => {
    if (quizQuestions.length > 0) {
      const progress = (currentQuestionIndex / quizQuestions.length);
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [currentQuestionIndex, quizQuestions.length]);

  // Glow style
  const glowStyle = {
    shadowColor: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', theme.colors.neonBlue],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    }),
  };

  // Progress style
  const progressStyle = {
    width: progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    }),
  };

  useEffect(() => {
    let selectedQuestions: any[] = [];

    if (mode === 'practice') {
      // For practice mode, get questions from specific chapter
      const chapter = questions[0].chapters.find(
        (ch: any) => ch.chapterName === chapterName
      );
      selectedQuestions = chapter ? chapter.questions : [];
    } else {
      // For mock/quiz mode, get random questions from all chapters
      const allQuestions = questions[0].chapters.reduce((acc: any[], chapter: any) => {
        return [...acc, ...chapter.questions];
      }, []);

      // Randomly select 24 questions
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      selectedQuestions = shuffled.slice(0, 24);
    }

    setQuizQuestions(selectedQuestions);
    setUserAnswers(new Array(selectedQuestions.length).fill(''));
    setLoading(false);
    
    // Start timer for mock and quiz modes
    if (mode === 'mock' || mode === 'quiz') {
      setTimerActive(true);
    }
  }, [mode, chapterName]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setTimerActive(false);
            setQuizCompleted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive, timeLeft, quizCompleted]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (currentQuestionIndex / quizQuestions.length) * 100;

  // Calculate score based on all user answers
  const calculateScore = (answers: string[]) => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      if (answer && answer === quizQuestions[index]?.correct_answer) {
        totalScore += 1;
      }
    });
    return totalScore;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Store user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
    
    // Recalculate score after answer change
    const newScore = calculateScore(newUserAnswers);
    setScore(newScore);
    
    // For practice mode, show explanation immediately
    if (mode !== 'mock') {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (mode === 'mock') {
      // For mock mode, just move to next question without showing explanation
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
        setTimerActive(false);
      }
    } else {
      // For practice mode, show explanation first
      if (!showExplanation) return;
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
        setTimerActive(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || null);
      setShowExplanation(false);
    }
  };

  const handleFinish = () => {
    navigation.navigate('Results', {
      score,
      totalQuestions: quizQuestions.length,
      questions: quizQuestions,
      userAnswers,
      mode,
      chapterName
    });
  };

  // Show loading screen while questions are being loaded
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.loadingSpinner,
              {
                transform: [{
                  rotate: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                }],
              },
            ]}
          >
            <Text style={[styles.loadingSpinnerText, { color: theme.colors.neonBlue }]}>⚡</Text>
          </Animated.View>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading Questions...
          </Text>
          <Text style={[styles.loadingSubtext, { color: theme.colors.textSecondary }]}>
            Preparing your {mode === 'mock' ? 'mock test' : 'quiz'} questions
          </Text>
        </View>
      </View>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            No Questions Available
          </Text>
          <Text style={[styles.errorSubtext, { color: theme.colors.textSecondary }]}>
            Please try again or check your connection.
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.neonBlue }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (quizCompleted) {
    const percent = (score / quizQuestions.length) * 100;
    const passed = percent >= 75;
    const timeExpired = timeLeft === 0;
    
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <Animated.View
          style={[
            styles.resultsHeader,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.neonBlue,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
            glowStyle,
          ]}
        >
          <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>
            QUIZ COMPLETE
          </Text>
          <Text style={[styles.resultsSubtitle, { color: theme.colors.neonPurple }]}>
            {chapterName}
          </Text>
          {timeExpired && (
            <Text style={[styles.timeExpiredText, { color: theme.colors.error }]}>
              Time's up!
            </Text>
          )}
          <Text style={[styles.scoreText, { color: theme.colors.neonBlue }]}>
            Your Score: {score} out of {quizQuestions.length} ({percent.toFixed(1)}%)
          </Text>
          <Text style={[styles.resultText, { 
            color: passed ? theme.colors.neonGreen : theme.colors.error 
          }]}> 
            {passed ? 'PASSED! ✅' : 'FAILED ❌'}
          </Text>
          {passed && (
            <Text style={[styles.congratsText, { color: theme.colors.neonGreen }]}>
              🎉 Congratulations! {mode === 'mock' ? 'You\'re ready for the real UK citizenship test!' : 'You\'ve mastered this UK module!'}
            </Text>
          )}
          {!passed && (
            <Text style={[styles.encouragementText, { color: theme.colors.textSecondary }]}>
              You need 75% to pass. Keep practicing! 💪
            </Text>
          )}
        </Animated.View>

        <FuturisticButton
          title="View Detailed Review"
          onPress={handleFinish}
          variant="primary"
          style={styles.finishButton}
        />
      </ScrollView>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isAnswerSelected = selectedAnswer !== null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.neonBlue,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
          glowStyle,
        ]}
      >
        <View style={styles.headerTop}>
          <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
            {chapterName}
          </Text>
          <Text style={[styles.questionCounter, { color: theme.colors.neonBlue }]}>
            {currentQuestionIndex + 1} / {quizQuestions.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={[
          styles.progressContainer,
          { backgroundColor: theme.colors.backgroundSecondary }
        ]}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: theme.colors.neonBlue,
              },
              progressStyle,
            ]}
          />
        </View>

        {/* Timer for mock and quiz modes */}
        {(mode === 'mock' || mode === 'quiz') && (
          <View style={styles.timerContainer}>
            <Text style={[styles.timerLabel, { color: theme.colors.textSecondary }]}>
              TIME REMAINING
            </Text>
            <Text style={[
              styles.timerValue,
              {
                color: timeLeft < 300 ? theme.colors.error : theme.colors.neonGreen,
              }
            ]}>
              {formatTime(timeLeft)}
            </Text>
          </View>
        )}
      </Animated.View>

      {/* Question Overview Panel - Only for Mock Tests */}
      {mode === 'mock' && (
        <View style={[styles.questionOverviewPanel, { backgroundColor: theme.colors.card, borderColor: theme.colors.neonBlue }]}>
          <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>Question Overview</Text>
          <Text style={[styles.overviewHint, { color: theme.colors.textSecondary }]}>
            💡 Tap any question number to jump to it and change your answer
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.questionNumbers}
            contentContainerStyle={styles.questionNumbersContent}
          >
            {quizQuestions.map((_, index) => {
              const isAnswered = userAnswers[index] !== undefined && userAnswers[index] !== '';
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.questionNumber,
                    { backgroundColor: theme.colors.backgroundSecondary },
                    isAnswered && { backgroundColor: theme.colors.neonBlue },
                    isCurrent && { 
                      backgroundColor: theme.colors.neonPurple,
                      borderColor: theme.colors.neonGreen,
                      borderWidth: 2
                    },
                  ]}
                  onPress={() => {
                    setCurrentQuestionIndex(index);
                    setSelectedAnswer(userAnswers[index] || null);
                    setShowExplanation(false);
                  }}
                >
                  <Text style={[
                    styles.questionNumberText,
                    { color: theme.colors.text },
                    (isAnswered || isCurrent) && { color: '#fff' }
                  ]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.neonBlue }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Answered</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.neonPurple, borderColor: theme.colors.neonGreen, borderWidth: 2 }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Current</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.backgroundSecondary }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Not answered</Text>
            </View>
          </View>
        </View>
      )}

      {/* Question Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.questionContainer,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.neonPurple,
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
            glowStyle,
          ]}
        >
          <Text style={[styles.questionText, { color: theme.colors.text }]}>
            {currentQuestion.question}
          </Text>
        </Animated.View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option: string, index: number) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correct_answer;
            const showFeedback = mode !== 'mock' && showExplanation;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: theme.colors.card,
                    shadowColor: theme.colors.cardShadow,
                  },
                  isSelected && !showFeedback && { backgroundColor: theme.colors.neonBlue },
                  showFeedback && isCorrect && { backgroundColor: theme.colors.neonGreen },
                  showFeedback && isSelected && !isCorrect && { backgroundColor: theme.colors.error },
                ]}
                onPress={() => handleAnswerSelect(option)}
                activeOpacity={0.8}
                disabled={mode !== 'mock' && showExplanation}
              >
                <Text style={[
                  styles.optionText,
                  { color: theme.colors.text },
                  isSelected && !showFeedback && { color: '#fff' },
                  showFeedback && isCorrect && { color: '#fff' },
                  showFeedback && isSelected && !isCorrect && { color: '#fff' },
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation Display for Practice Mode - Only show after user selects an answer */}
        {mode !== 'mock' && showExplanation && currentQuestion.explanation && (
          <Animated.View
            style={[
              styles.explanationContainer,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.neonBlue,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={[styles.explanationTitle, { color: theme.colors.neonBlue }]}>
              💡 EXPLANATION
            </Text>
            <Text style={[styles.explanationText, { color: theme.colors.textSecondary }]}>
              {currentQuestion.explanation}
            </Text>
          </Animated.View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <FuturisticButton
            title="Previous"
            onPress={handlePrevious}
            variant="secondary"
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          />
          
          <FuturisticButton
            title={currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next"}
            onPress={handleNext}
            variant="primary"
            disabled={mode !== 'mock' ? !showExplanation : false}
            style={styles.navButton}
          />
        </View>

        {/* Finish Quiz Button for Mock Test */}
        {mode === 'mock' && (
          <View style={styles.finishContainer}>
            <FuturisticButton
              title="Finish Quiz Now"
              onPress={() => {
                setQuizCompleted(true);
                setTimerActive(false);
              }}
              variant="danger"
              style={styles.finishButton}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 5,
  },
  timerValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
  },
  finishContainer: {
    alignItems: 'center',
  },
  finishButton: {
    minWidth: 200,
  },
  // Question Overview Panel styles
  questionOverviewPanel: {
    margin: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  overviewHint: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  questionNumbers: {
    marginBottom: 10,
  },
  questionNumbersContent: {
    paddingHorizontal: 5,
  },
  questionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumberText: {
    fontSize: 14,
    fontWeight: '700',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
    fontWeight: '500',
  },
  // Results styles
  resultsHeader: {
    padding: 25,
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultsSubtitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  timeExpiredText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  congratsText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  encouragementText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  // Explanation styles
  explanationContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'left',
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingSpinner: {
    marginBottom: 20,
  },
  loadingSpinnerText: {
    fontSize: 48,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UKQuizScreen;