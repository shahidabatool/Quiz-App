import canadaQuestions from '../../assets/canada_questions.json';
import type { BookData, Question } from '../types';

// Load questions
const allBooks: BookData[] = [canadaQuestions];

// Add a variable to cache loaded questions
let cachedCanadaQuestions: BookData | null = null;

// Async loader for web and native
export async function loadCanadaQuestions(): Promise<BookData> {
  if (cachedCanadaQuestions) return cachedCanadaQuestions;
  if (typeof window !== 'undefined' && window.fetch) {
    // Web: fetch from public - use questions_canada.json as requested
    const res = await fetch('/questions_canada.json');
    const data = await res.json();
    cachedCanadaQuestions = data;
    return data;
  } else {
    // Native: require - use questions_canada.json as requested
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../assets/questions_canada.json');
    cachedCanadaQuestions = data;
    return data;
  }
}

// Update getChapters/getQuestionsForChapter to be async and use loaded data
export async function getChapters(): Promise<string[]> {
  const book = await loadCanadaQuestions();
  return book.chapters.map((c: any) => c.chapterName);
}

export async function getQuestionsForChapter(chapterName: string): Promise<Question[]> {
  const book = await loadCanadaQuestions();
  const chapter = book.chapters.find((c: any) => c.chapterName === chapterName);
  if (!chapter) return [];
  
  // Map questions to ensure correct format (convert correct_answer to correctAnswer)
  return chapter.questions.map((q: any) => ({
    id: q.id.toString(),
    moduleId: chapterName,
    question: q.question,
    answers: q.options,
    options: q.options,
    correctAnswer: q.correct_answer, // Map from correct_answer to correctAnswer
    explanation: q.explanation
  }));
}

// Fisher-Yates shuffle algorithm for proper randomization
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomQuestions = (mode: 'practice' | 'test' | 'mock', count: number = 20): Question[] => {
  let allQuestions: Question[] = [];
  
  // Get all questions from all books and chapters
  allBooks.forEach(book => {
    if (book.chapters) {
      book.chapters.forEach(chapter => {
        allQuestions.push(...chapter.questions);
      });
    }
  });

  // For test and mock modes, always return random questions
  if (mode === 'test' || mode === 'mock') {
    const shuffledQuestions = shuffleArray(allQuestions);
    return shuffledQuestions.slice(0, Math.min(count, shuffledQuestions.length));
  }
  
  // For practice mode, return all questions (chapter-specific selection handled elsewhere)
  return shuffleArray(allQuestions).slice(0, Math.min(count, allQuestions.length));
};

export const getAllQuestions = (): Question[] => {
  let allQuestions: Question[] = [];
  allBooks.forEach(book => {
    if (book.chapters) {
      book.chapters.forEach(chapter => {
        allQuestions.push(...chapter.questions);
      });
    }
  });
  return allQuestions;
};

export const getTotalQuestionCount = (): number => {
  return getAllQuestions().length;
};

// Get all available books for selection
export const getAvailableBooks = (): BookData[] => {
  return allBooks;
};

// Get questions from a specific book
export const getQuestionsFromBook = (bookTitle: string): Question[] => {
  const book = allBooks.find(b => b.bookTitle === bookTitle);
  if (!book || !book.chapters) return [];
  
  let bookQuestions: Question[] = [];
  book.chapters.forEach(chapter => {
    bookQuestions.push(...chapter.questions);
  });
  
  return bookQuestions;
};

// Get random questions from a specific section/book
export const getRandomQuestionsFromSection = (bookTitle: string, count: number = 20): Question[] => {
  const sectionQuestions = getQuestionsFromBook(bookTitle);
  const shuffledQuestions = shuffleArray(sectionQuestions);
  return shuffledQuestions.slice(0, Math.min(count, shuffledQuestions.length));
};

export const getChaptersWithSections = (): {section: string; chapter: string}[] => {
    const result: {section: string; chapter: string}[] = [];
    allBooks.forEach(book => {
        book.chapters.forEach(chapter => {
            result.push({ section: book.bookTitle, chapter: chapter.chapterName });
        });
    });
    return result;
}; 