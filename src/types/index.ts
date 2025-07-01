// Defines the structure for a single question
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

// Defines the structure for a chapter, containing a name and a list of questions
export interface Chapter {
  chapterName: string;
  questions: Question[];
}

// Defines the structure for a book, containing a title and a list of chapters
export interface BookData {
  bookTitle: string;
  chapters: Chapter[];
}

// Navigation parameters for the app's routes
export type RootStackParamList = {
  Home: undefined;
  ChapterSelection: undefined; // For selecting a chapter for practice
  Practice: undefined; // This might be removed if ChapterSelection replaces its role
  Test: undefined;
  Mock: undefined;
  QuizScreen: { chapterName: string } | { mode: "test" | "mock" }; // For practice by chapter or other modes
  Results: {
    score: number;
    totalQuestions: number;
    timeTaken: number;
    questions: Question[];
    userAnswers: (string | null)[];
    quizTitle: string;
  };
}; 