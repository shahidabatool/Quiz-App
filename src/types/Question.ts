export interface Question {
  id: string;
  chapter: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
} 