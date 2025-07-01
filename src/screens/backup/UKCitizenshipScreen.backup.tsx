import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UKCitizenshipScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>UK Citizenship Test</Text>
      <Text style={styles.description}>
        Prepare for your UK citizenship test with our comprehensive practice modules,
        mock tests, and quizzes. Choose a mode to begin your preparation.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UKPracticeModule')}
        >
          <Text style={styles.buttonTitle}>Practice Mode</Text>
          <Text style={styles.buttonDescription}>
            Study and practice questions by topic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UKMock')}
        >
          <Text style={styles.buttonTitle}>Mock Test</Text>
          <Text style={styles.buttonDescription}>
            Take a full mock test under exam conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UKQuiz')}
        >
          <Text style={styles.buttonTitle}>Quick Quiz</Text>
          <Text style={styles.buttonDescription}>
            Test your knowledge with random questions
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default UKCitizenshipScreen; 