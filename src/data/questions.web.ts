import { QuizQuestion } from '../types';

export const questions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the capital of Canada?',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    correctAnswer: 'Ottawa',
    explanation: 'Ottawa is the capital city of Canada, located in the province of Ontario.',
    chapter: 'Geography'
  },
  {
    id: '2',
    question: 'Which Canadian province is the largest by area?',
    options: ['Ontario', 'Quebec', 'British Columbia', 'Nunavut'],
    correctAnswer: 'Quebec',
    explanation: 'Quebec is the largest Canadian province by area.',
    chapter: 'Geography'
  },
  {
    id: '3',
    question: 'What year did Canada become a country?',
    options: ['1867', '1865', '1870', '1900'],
    correctAnswer: '1867',
    explanation: 'Canada became a country on July 1, 1867, with the signing of the British North America Act.',
    chapter: 'History'
  },
  {
    id: '4',
    question: 'Who was the first Prime Minister of Canada?',
    options: ['William Lyon Mackenzie King', 'John A. Macdonald', 'Robert Borden', 'Wilfrid Laurier'],
    correctAnswer: 'John A. Macdonald',
    explanation: 'Sir John A. Macdonald was the first Prime Minister of Canada, serving from 1867-1873 and 1878-1891.',
    chapter: 'History'
  },
  {
    id: '5',
    question: 'What are the official languages of Canada?',
    options: ['English only', 'French only', 'English and French', 'English, French, and Indigenous languages'],
    correctAnswer: 'English and French',
    explanation: 'Canada has two official languages: English and French.',
    chapter: 'Culture'
  }
]; 