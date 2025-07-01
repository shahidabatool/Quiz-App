import { Module } from './types';

export const APP_CONFIG = {
  // Quiz settings
  MOCK_TEST_DURATION: 30 * 60, // 30 minutes in seconds
  MOCK_TEST_QUESTIONS: 24,
  QUIZ_QUESTIONS: 20,
  PASS_PERCENTAGE: 75, // 75% to pass

  // Navigation
  ROUTES: {
    HOME: 'Home',
    UK_CITIZENSHIP: 'UKCitizenship',
    UK_CHAPTERS: 'UKChapters',
    PRACTICE_MODULE: 'PracticeModule',
    QUIZ: 'Quiz',
  },

  // Quiz modes
  QUIZ_MODES: {
    MOCK: 'mock',
    QUIZ: 'quiz',
    PRACTICE: 'practice',
  } as const,
};

export const UK_MODULES: Module[] = [
  {
    id: 'values-and-principles',
    title: 'Values and Principles',
    description: 'British values, freedoms and principles of democracy',
    icon: '⚖️',
    country: 'uk'
  },
  {
    id: 'history',
    title: 'History of Britain',
    description: 'Key events and periods in British history',
    icon: '📜',
    country: 'uk'
  },
  {
    id: 'government',
    title: 'Government and Law',
    description: 'How Britain is governed and the legal system',
    icon: '🏛️',
    country: 'uk'
  },
  {
    id: 'your-role',
    title: 'Your Role in Society',
    description: 'Rights, responsibilities and contributing to society',
    icon: '🤝',
    country: 'uk'
  },
  {
    id: 'traditions',
    title: 'Traditions and Culture',
    description: 'British traditions, customs and cultural life',
    icon: '🎭',
    country: 'uk'
  }
];

export const CANADIAN_MODULES: Module[] = [
  {
    id: 'rights-responsibilities',
    title: 'Rights and Responsibilities',
    description: 'Canadian rights, freedoms and responsibilities',
    icon: '⚖️',
    country: 'canada'
  },
  {
    id: 'history',
    title: 'Canadian History',
    description: 'Key events and periods in Canadian history',
    icon: '📜',
    country: 'canada'
  },
  {
    id: 'government',
    title: 'Government and Democracy',
    description: 'How Canada is governed and democratic processes',
    icon: '🏛️',
    country: 'canada'
  },
  {
    id: 'modern-canada',
    title: 'Modern Canada',
    description: 'Geography, economy and modern Canadian life',
    icon: '🍁',
    country: 'canada'
  },
  {
    id: 'symbols',
    title: 'Canadian Symbols',
    description: 'National symbols, holidays and celebrations',
    icon: '🎨',
    country: 'canada'
  }
]; 