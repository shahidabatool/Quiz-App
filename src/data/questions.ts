export interface Question {
  id: string;
  moduleId: number | string;
  question: string;
  answers: string[];
  correctAnswer: string;
  explanation?: string;
}

export const questions: Question[] = [
  // Module 1: Applying for Citizenship
  {
    id: '1.1',
    moduleId: 1,
    question: 'What is the minimum age to apply for Canadian citizenship?',
    answers: ['16 years', '18 years', '21 years', 'There is no minimum age'],
    correctAnswer: '18 years',
    explanation: 'You must be at least 18 years old to apply for Canadian citizenship on your own.'
  },
  {
    id: '1.2',
    moduleId: 1,
    question: 'How long must you have been physically present in Canada as a permanent resident before applying for citizenship?',
    answers: ['2 years', '3 years', '4 years', '5 years'],
    correctAnswer: '3 years',
    explanation: 'You must have been physically present in Canada for at least 3 years (1,095 days) in the 5 years before applying.'
  },

  // Module 2: Rights and Responsibilities
  {
    id: '2.1',
    moduleId: 2,
    question: 'Which of these is a right of Canadian citizens?',
    answers: [
      'Free healthcare anywhere in the world',
      'Vote in federal elections',
      'Work without a permit',
      'Travel without a passport'
    ],
    correctAnswer: 'Vote in federal elections',
    explanation: 'Voting in federal elections is a fundamental right of Canadian citizens.'
  },
  {
    id: '2.2',
    moduleId: 2,
    question: 'What is a responsibility of Canadian citizens?',
    answers: [
      'Serve in the military',
      'Own property',
      'Obey the law',
      'Join a political party'
    ],
    correctAnswer: 'Obey the law',
    explanation: 'All Canadian citizens have the responsibility to obey the law and respect the rights of others.'
  },

  // Module 3: Who We Are
  {
    id: '3.1',
    moduleId: 3,
    question: 'What are the two official languages of Canada?',
    answers: [
      'English and French',
      'English and Spanish',
      'French and Spanish',
      'English and Indigenous languages'
    ],
    correctAnswer: 'English and French',
    explanation: 'Canada has two official languages: English and French. This reflects Canada\'s history of English and French colonization.'
  },
  {
    id: '3.2',
    moduleId: 3,
    question: 'Who are the First Nations?',
    answers: [
      'The first European settlers',
      'Original inhabitants of Canada',
      'French colonists',
      'British settlers'
    ],
    correctAnswer: 'Original inhabitants of Canada',
    explanation: 'First Nations are the original inhabitants of Canada who lived here before European colonization.'
  },

  // Module 4: Canada's History
  {
    id: '4.1',
    moduleId: 4,
    question: 'When did Canada become a country?',
    answers: ['1867', '1876', '1900', '1812'],
    correctAnswer: '1867',
    explanation: 'Canada became a country (Confederation) on July 1, 1867, when the British North America Act united three British colonies.'
  },
  {
    id: '4.2',
    moduleId: 4,
    question: 'Who was the first Prime Minister of Canada?',
    answers: [
      'William Lyon Mackenzie King',
      'John A. Macdonald',
      'Louis Riel',
      'George-Étienne Cartier'
    ],
    correctAnswer: 'John A. Macdonald',
    explanation: 'Sir John A. Macdonald was Canada\'s first Prime Minister, serving from 1867-1873 and 1878-1891.'
  },

  // Module 5: Modern Canada
  {
    id: '5.1',
    moduleId: 5,
    question: 'What is the capital city of Canada?',
    answers: ['Toronto', 'Montreal', 'Vancouver', 'Ottawa'],
    correctAnswer: 'Ottawa',
    explanation: 'Ottawa, located in Ontario, is the capital city of Canada.'
  },
  {
    id: '5.2',
    moduleId: 5,
    question: 'How many provinces does Canada have?',
    answers: ['8', '9', '10', '13'],
    correctAnswer: '10',
    explanation: 'Canada has 10 provinces and 3 territories.'
  },

  // Module 6: How Canadians Govern Themselves
  {
    id: '6.1',
    moduleId: 6,
    question: 'Who is Canada\'s head of state?',
    answers: [
      'The Prime Minister',
      'The King',
      'The Governor General',
      'The Chief Justice'
    ],
    correctAnswer: 'The King',
    explanation: 'The King is Canada\'s head of state, represented in Canada by the Governor General.'
  },
  {
    id: '6.2',
    moduleId: 6,
    question: 'What are the three levels of government in Canada?',
    answers: [
      'Federal, provincial/territorial, municipal',
      'Executive, legislative, judicial',
      'National, regional, local',
      'Crown, Parliament, Senate'
    ],
    correctAnswer: 'Federal, provincial/territorial, municipal',
    explanation: 'Canada has three levels of government: federal (national), provincial/territorial, and municipal (local).'
  },

  // Module 7: Federal Elections
  {
    id: '7.1',
    moduleId: 7,
    question: 'What is the minimum voting age in federal elections?',
    answers: ['16 years', '18 years', '21 years', '19 years'],
    correctAnswer: '18 years',
    explanation: 'Canadian citizens who are 18 years or older can vote in federal elections.'
  },
  {
    id: '7.2',
    moduleId: 7,
    question: 'How are Members of Parliament chosen?',
    answers: [
      'Appointed by the Prime Minister',
      'Elected by voters in their riding',
      'Selected by provincial governments',
      'Chosen by the Governor General'
    ],
    correctAnswer: 'Elected by voters in their riding',
    explanation: 'MPs are elected by voters in their electoral districts (ridings) during federal elections.'
  },

  // Module 8: Justice System
  {
    id: '8.1',
    moduleId: 8,
    question: 'What document protects the basic rights of Canadians?',
    answers: [
      'The Constitution Act',
      'The Charter of Rights and Freedoms',
      'The British North America Act',
      'The Criminal Code'
    ],
    correctAnswer: 'The Charter of Rights and Freedoms',
    explanation: 'The Canadian Charter of Rights and Freedoms (1982) protects the basic rights and freedoms of all Canadians.'
  },
  {
    id: '8.2',
    moduleId: 8,
    question: 'What is the highest court in Canada?',
    answers: [
      'The Federal Court',
      'The Supreme Court',
      'The Provincial Court',
      'The Court of Appeal'
    ],
    correctAnswer: 'The Supreme Court',
    explanation: 'The Supreme Court of Canada is the highest court and final court of appeal in the country.'
  },

  // Module 9: Canadian Symbols
  {
    id: '9.1',
    moduleId: 9,
    question: 'What is Canada\'s national animal?',
    answers: ['Moose', 'Beaver', 'Polar Bear', 'Canada Goose'],
    correctAnswer: 'Beaver',
    explanation: 'The beaver has been a symbol of Canada since the 17th century and appears on the nickel.'
  },
  {
    id: '9.2',
    moduleId: 9,
    question: 'What are Canada\'s official colors?',
    answers: [
      'Red and White',
      'Red and Blue',
      'Blue and White',
      'Red, White, and Blue'
    ],
    correctAnswer: 'Red and White',
    explanation: 'Red and white are Canada\'s official colors, as shown on the Canadian flag.'
  },

  // Module 10: Canada's Economy
  {
    id: '10.1',
    moduleId: 10,
    question: 'What is Canada\'s currency called?',
    answers: [
      'Canadian Dollar',
      'Canadian Pound',
      'Canadian Euro',
      'Canadian Franc'
    ],
    correctAnswer: 'Canadian Dollar',
    explanation: 'The Canadian Dollar (CAD) is Canada\'s official currency.'
  },
  {
    id: '10.2',
    moduleId: 10,
    question: 'Which economic sector is Canada known for globally?',
    answers: [
      'Technology only',
      'Agriculture only',
      'Natural resources',
      'Manufacturing only'
    ],
    correctAnswer: 'Natural resources',
    explanation: 'Canada is known globally for its natural resources, including oil, minerals, and timber.'
  },

  // Module 11: Canada's Regions
  {
    id: '11.1',
    moduleId: '11.1',
    question: 'Which provinces are part of Atlantic Canada?',
    answers: [
      'Ontario and Quebec',
      'Nova Scotia, New Brunswick, PEI, and Newfoundland and Labrador',
      'British Columbia and Alberta',
      'Manitoba and Saskatchewan'
    ],
    correctAnswer: 'Nova Scotia, New Brunswick, PEI, and Newfoundland and Labrador',
    explanation: 'Atlantic Canada consists of four provinces: Nova Scotia, New Brunswick, Prince Edward Island, and Newfoundland and Labrador.'
  },
  {
    id: '11.2',
    moduleId: '11.2',
    question: 'Which two provinces make up Central Canada?',
    answers: [
      'Ontario and Quebec',
      'Alberta and Saskatchewan',
      'Manitoba and Ontario',
      'Quebec and New Brunswick'
    ],
    correctAnswer: 'Ontario and Quebec',
    explanation: 'Central Canada consists of Ontario and Quebec, the two most populous provinces.'
  },
  {
    id: '11.3',
    moduleId: '11.3',
    question: 'Which provinces are considered the Prairie Provinces?',
    answers: [
      'Ontario, Manitoba, Saskatchewan',
      'Alberta, Saskatchewan, Manitoba',
      'British Columbia, Alberta, Saskatchewan',
      'Manitoba, Saskatchewan, Quebec'
    ],
    correctAnswer: 'Alberta, Saskatchewan, Manitoba',
    explanation: 'The Prairie Provinces are Alberta, Saskatchewan, and Manitoba, known for their vast prairies and agricultural land.'
  },
  {
    id: '11.4',
    moduleId: '11.4',
    question: 'Which province is considered Canada\'s West Coast?',
    answers: [
      'Alberta',
      'Manitoba',
      'British Columbia',
      'Saskatchewan'
    ],
    correctAnswer: 'British Columbia',
    explanation: 'British Columbia is Canada\'s westernmost province and is known for its Pacific coastline.'
  },
  {
    id: '11.5',
    moduleId: '11.5',
    question: 'What are Canada\'s three territories?',
    answers: [
      'Yukon, Northwest Territories, Nunavut',
      'Northern Ontario, Northern Quebec, Labrador',
      'Alaska, Yukon, Northwest Territories',
      'Nunavut, Northern Alberta, Northern BC'
    ],
    correctAnswer: 'Yukon, Northwest Territories, Nunavut',
    explanation: 'Canada\'s three territories are Yukon, Northwest Territories, and Nunavut, all located in Northern Canada.'
  }
]; 