export interface Question {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  country: 'uk' | 'canada';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  country: 'uk' | 'canada';
}

export type RootStackParamList = {
  Home: undefined;
  CanadianModules: undefined;
  UKCitizenship: undefined;
  UKChapters: undefined;
  CanadaStudyGuide: undefined;
  UKStudyGuide: undefined;
  PracticeModule: {
    moduleId: string;
    country: 'uk' | 'canada';
    title: string;
  };
  Quiz: {
    country?: 'uk' | 'canada';
    mode: 'mock' | 'quiz' | 'practice';
    chapterName?: string;
  };
  UKPracticeModule: undefined;
  UKQuiz: {
    mode: 'mock' | 'quiz' | 'practice';
    chapterName: string;
  };
  UKMock: undefined;
  Results: {
    score: number;
    total: number;
    mode: string;
    chapterName?: string;
  };
};

// Add PDF module declaration
declare module '*.pdf' {
  const content: string;
  export default content;
} 