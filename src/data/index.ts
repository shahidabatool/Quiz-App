import { Question } from '../types';
import { ukQuestions, ukModules } from './uk-questions';

export const getQuestionsByModule = (moduleId: string): Question[] => {
  return ukQuestions.filter(q => q.moduleId === moduleId);
};

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...ukQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export { ukQuestions, ukModules }; 