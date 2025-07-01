import { Question } from '../types';

export const ukModules = [
  {
    id: 'values-and-principles',
    title: 'Values and Principles',
    description: 'British values, freedoms and principles of democracy',
    icon: '🎭'
  },
  {
    id: 'history',
    title: 'A Long and Illustrious History',
    description: 'From early Britain to modern times',
    icon: '📚'
  },
  {
    id: 'modern-uk',
    title: 'Modern UK',
    description: 'Contemporary British society and culture',
    icon: '🏰'
  },
  {
    id: 'government',
    title: 'Government and Law',
    description: 'How Britain is governed and your role',
    icon: '⚖️'
  },
  {
    id: 'your-role',
    title: 'Your Role and Rights',
    description: 'Rights, responsibilities and getting involved',
    icon: '👥'
  }
];

export const ukQuestions: Question[] = [
  // Values and Principles
  {
    id: 'uk_vp_1',
    moduleId: 'values-and-principles',
    question: 'What are the fundamental values of British society?',
    options: [
      'Democracy, the rule of law, individual liberty, and respect for all faiths',
      'Monarchy, aristocracy, and social class',
      'Economic prosperity and military power',
      'Geographic location and natural resources'
    ],
    correctAnswer: 'Democracy, the rule of law, individual liberty, and respect for all faiths',
    explanation: 'British society is founded on fundamental values including democracy, the rule of law, individual liberty, and respect and tolerance for different faiths and beliefs.'
  },
  {
    id: 'uk_vp_2',
    moduleId: 'values-and-principles',
    question: 'What is the official church in England?',
    options: [
      'The Church of England',
      'The Roman Catholic Church',
      'The Methodist Church',
      'The Presbyterian Church'
    ],
    correctAnswer: 'The Church of England',
    explanation: 'The Church of England is the established church in England and has been since the 1530s.'
  },
  // History
  {
    id: 'uk_hist_1',
    moduleId: 'history',
    question: 'When did women get equal voting rights with men in Britain?',
    options: [
      '1918',
      '1928',
      '1945',
      '1950'
    ],
    correctAnswer: '1928',
    explanation: 'Women over 30 gained the right to vote in 1918, but it wasn\'t until 1928 that women gained equal voting rights with men (at age 21).'
  },
  {
    id: 'uk_hist_2',
    moduleId: 'history',
    question: 'Who was the first Tudor monarch of England?',
    options: [
      'Henry VII',
      'Henry VIII',
      'Elizabeth I',
      'Richard III'
    ],
    correctAnswer: 'Henry VII',
    explanation: 'Henry VII became the first Tudor monarch after defeating Richard III at the Battle of Bosworth Field in 1485.'
  },
  // Modern UK
  {
    id: 'uk_mod_1',
    moduleId: 'modern-uk',
    question: 'Which TWO are British overseas territories?',
    options: [
      'The Falkland Islands and Gibraltar',
      'Malta and Cyprus',
      'India and Pakistan',
      'Ireland and Scotland'
    ],
    correctAnswer: 'The Falkland Islands and Gibraltar',
    explanation: 'The Falkland Islands and Gibraltar are British overseas territories, while the others are either independent nations or part of the UK itself.'
  },
  // Government
  {
    id: 'uk_gov_1',
    moduleId: 'government',
    question: 'What is the supreme court of the United Kingdom?',
    options: [
      'The Supreme Court',
      'The House of Lords',
      'The Crown Court',
      'The High Court'
    ],
    correctAnswer: 'The Supreme Court',
    explanation: 'The Supreme Court is the final court of appeal in the UK for civil cases and for criminal cases from England, Wales and Northern Ireland.'
  },
  // Your Role
  {
    id: 'uk_role_1',
    moduleId: 'your-role',
    question: 'At what age can you vote in UK general elections?',
    options: [
      '16',
      '17',
      '18',
      '21'
    ],
    correctAnswer: '18',
    explanation: 'You can register to vote when you\'re 17, but you can only vote once you turn 18.'
  }
];

// Helper function to get questions by module
export const getUKQuestionsByModule = (moduleId: string): Question[] => {
  return ukQuestions.filter(q => q.moduleId === moduleId);
};

// Helper function to get random questions for mock test
export const getRandomUKQuestions = (count: number): Question[] => {
  const shuffled = [...ukQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}; 