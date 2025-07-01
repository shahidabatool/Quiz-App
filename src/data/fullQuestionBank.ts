import { Question } from '../types/Question';

// This file contains all questions for the Canadian Citizenship Test
// Each chapter has 20 questions to ensure comprehensive coverage

export const fullQuestionBank: Question[] = [
  // Chapter 1: Canadian Symbols (20 questions)
  {
    id: "symbols_1",
    chapter: "01",
    question: "What is Canada's national anthem?",
    options: ["O Canada", "God Save the Queen", "The Maple Leaf Forever", "Canada's Song"],
    correctAnswer: 0,
    explanation: "O Canada is Canada's national anthem, officially adopted in 1980."
  },
  {
    id: "symbols_2",
    chapter: "01",
    question: "What are Canada's official colors?",
    options: ["Blue and white", "Red and white", "Red and blue", "Green and white"],
    correctAnswer: 1,
    explanation: "Red and white are Canada's official colors, assigned by King George V in 1921."
  },
  {
    id: "symbols_3",
    chapter: "01",
    question: "What is on Canada's flag?",
    options: [
      "A maple leaf",
      "A beaver",
      "A moose",
      "A bear"
    ],
    correctAnswer: 0,
    explanation: "The Canadian flag features a stylized red maple leaf in the center of a white square between two red rectangles."
  },
  {
    id: "symbols_4",
    chapter: "01",
    question: "When was the current Canadian flag adopted?",
    options: [
      "1965",
      "1867",
      "1982",
      "1931"
    ],
    correctAnswer: 0,
    explanation: "The current Canadian flag was officially adopted on February 15, 1965."
  },
  {
    id: "symbols_5",
    chapter: "01",
    question: "What is Canada's national animal?",
    options: [
      "The beaver",
      "The moose",
      "The polar bear",
      "The Canada goose"
    ],
    correctAnswer: 0,
    explanation: "The beaver is Canada's national animal, recognized for its importance in the fur trade history."
  },
  // Add more symbols questions to reach 20...

  // Chapter 2: Canadian Regions (20 questions)
  {
    id: "regions_1",
    chapter: "02",
    question: "How many provinces does Canada have?",
    options: [
      "10",
      "12",
      "8",
      "13"
    ],
    correctAnswer: 0,
    explanation: "Canada has 10 provinces: British Columbia, Alberta, Saskatchewan, Manitoba, Ontario, Quebec, New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland and Labrador."
  },
  {
    id: "regions_2",
    chapter: "02",
    question: "How many territories does Canada have?",
    options: [
      "3",
      "2",
      "4",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Canada has 3 territories: Yukon, Northwest Territories, and Nunavut."
  },
  // Add more regions questions...

  // Chapter 3: Rights and Responsibilities (20 questions)
  {
    id: "rights_1",
    chapter: "03",
    question: "What is the Canadian Charter of Rights and Freedoms?",
    options: [
      "A part of the Constitution that protects basic rights and freedoms",
      "A government policy document",
      "A historical treaty",
      "A citizenship handbook"
    ],
    correctAnswer: 0,
    explanation: "The Canadian Charter of Rights and Freedoms is part of the Constitution Act, 1982, and protects the basic rights and freedoms of all Canadians."
  },
  // Add more rights questions...

  // Chapter 4: Canadian Democracy (20 questions)
  {
    id: "democracy_1",
    chapter: "04",
    question: "Who is Canada's head of state?",
    options: [
      "The King",
      "The Prime Minister",
      "The Governor General",
      "The Chief Justice"
    ],
    correctAnswer: 0,
    explanation: "The King is Canada's head of state and is represented in Canada by the Governor General."
  },
  // Add more democracy questions...

  // Chapter 5: Canadian History (20 questions)
  {
    id: "history_1",
    chapter: "05",
    question: "Who were the first Europeans to establish settlements in Canada?",
    options: [
      "The French",
      "The British",
      "The Vikings",
      "The Dutch"
    ],
    correctAnswer: 0,
    explanation: "The French were the first Europeans to establish permanent settlements in Canada, beginning with Port Royal (1605) and Quebec City (1608)."
  },
  // Add more history questions...

  // Chapter 6: Modern Canada (20 questions)
  {
    id: "modern_1",
    chapter: "06",
    question: "What is Canada's population (approximate)?",
    options: [
      "38 million",
      "25 million",
      "50 million",
      "45 million"
    ],
    correctAnswer: 0,
    explanation: "Canada's population is approximately 38 million people (as of 2023)."
  }
  // Add more modern Canada questions...
]; 