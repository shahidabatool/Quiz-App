import * as SQLite from 'expo-sqlite';
import citizenshipQuestionsData from '../../assets/citizenship-questions.json';
import historyQuestionsData from '../../assets/history-questions.json';
import governmentQuestionsData from '../../assets/government-questions.json';
import type { BookData, Question } from '../types';

// The 'section' will be the book title.
// The 'explanation' field is added as requested, will be empty for now.
export interface DbQuestion {
  id: number;
  question: string;
  options: string; // Stored as JSON string
  correct_answer: string;
  explanation: string;
  section: string; // bookTitle
  chapter: string; // chapterName
}

const db = SQLite.openDatabase('quiz.db');

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const transformQuestion = (dbQ: DbQuestion): Question => {
  return {
    ...dbQ,
    options: JSON.parse(dbQ.options),
  };
};

export const initDB = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS questions (
          id INTEGER PRIMARY KEY NOT NULL,
          question TEXT NOT NULL,
          options TEXT NOT NULL,
          correct_answer TEXT NOT NULL,
          explanation TEXT,
          section TEXT NOT NULL,
          chapter TEXT NOT NULL
        );`,
        [],
        () => {
          // Check if table is empty
          tx.executeSql(
            'SELECT * FROM questions LIMIT 1;',
            [],
            (_, result) => {
              if (result.rows.length === 0) {
                // Populate the database
                const allBooks: BookData[] = [
                  ...(citizenshipQuestionsData as BookData[]),
                  ...(historyQuestionsData as BookData[]),
                  ...(governmentQuestionsData as BookData[]),
                ];

                allBooks.forEach(book => {
                  book.chapters.forEach(chapter => {
                    chapter.questions.forEach(question => {
                      tx.executeSql(
                        `INSERT INTO questions (id, question, options, correct_answer, explanation, section, chapter) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                        [
                          question.id,
                          question.question,
                          JSON.stringify(question.options),
                          question.correct_answer,
                          '', // Empty explanation for now
                          book.bookTitle,
                          chapter.chapterName,
                        ],
                        () => {},
                        (_, error) => {
                          console.log('Error inserting question:', error);
                          reject(error);
                          return false; // Stop transaction
                        }
                      );
                    });
                  });
                });
                console.log('Database populated successfully!');
                resolve();
              } else {
                console.log('Database already populated.');
                resolve();
              }
            },
            (_, error) => {
              console.log('Error checking if table is empty:', error);
              reject(error);
              return false;
            }
          );
        },
        (_, error) => {
          console.log('Error creating table:', error);
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
};

export const getChapters = (bookTitle?: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        let query = 'SELECT DISTINCT chapter FROM questions';
        const params = [];
        if (bookTitle) {
          query += ' WHERE section = ?';
          params.push(bookTitle);
        }
        tx.executeSql(
          query,
          params,
          (_, result) => {
            const chapters: string[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              chapters.push(result.rows.item(i).chapter);
            }
            resolve(chapters);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };
  
  export const getQuestionsForChapter = (chapterName: string): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM questions WHERE chapter = ?;',
          [chapterName],
          (_, result) => {
            const questions: Question[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              questions.push(transformQuestion(result.rows.item(i)));
            }
            resolve(questions);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };
  
  const getAllQuestionsFromDB = (): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM questions;',
          [],
          (_, result) => {
            const questions: Question[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              questions.push(transformQuestion(result.rows.item(i)));
            }
            resolve(questions);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };
  
  export const getRandomQuestions = async (mode: 'practice' | 'test' | 'mock', count: number = 20): Promise<Question[]> => {
    const allQuestions = await getAllQuestionsFromDB();
    const shuffledQuestions = shuffleArray(allQuestions);
    return shuffledQuestions.slice(0, Math.min(count, shuffledQuestions.length));
  };
  
  export const getAllQuestions = (): Promise<Question[]> => {
    return getAllQuestionsFromDB();
  };
  
  export const getTotalQuestionCount = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT COUNT(*) as count FROM questions;',
          [],
          (_, result) => {
            resolve(result.rows.item(0).count);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };
  
  export const getAvailableBooks = (): Promise<BookData[]> => {
      return new Promise((resolve, reject) => {
          db.transaction(tx => {
              tx.executeSql(
                  'SELECT DISTINCT section FROM questions;',
                  [],
                  (_, result) => {
                      const books: BookData[] = [];
                      for (let i = 0; i < result.rows.length; i++) {
                          books.push({ bookTitle: result.rows.item(i).section, chapters: [] }); // chapters can be populated if needed
                      }
                      resolve(books);
                  },
                  (_, error) => {
                      reject(error);
                      return false;
                  }
              )
          })
      })
  }
  
  export const getQuestionsFromBook = (bookTitle: string): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM questions WHERE section = ?;',
          [bookTitle],
          (_, result) => {
            const questions: Question[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              questions.push(transformQuestion(result.rows.item(i)));
            }
            resolve(questions);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  };
  
  export const getRandomQuestionsFromSection = async (bookTitle: string, count: number = 20): Promise<Question[]> => {
    const sectionQuestions = await getQuestionsFromBook(bookTitle);
    const shuffledQuestions = shuffleArray(sectionQuestions);
    return shuffledQuestions.slice(0, Math.min(count, shuffledQuestions.length));
  };

  export const getChaptersWithSections = (): Promise<{section: string; chapter: string}[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT DISTINCT section, chapter FROM questions ORDER BY section, chapter;',
          [],
          (_, result) => {
            const chapters: {section: string; chapter: string}[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              chapters.push(result.rows.item(i));
            }
            resolve(chapters);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }; 