export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const chapters: Chapter[] = [
  {
    id: '01',
    title: 'Canadian Symbols',
    description: 'Learn about Canada\'s important national symbols',
    icon: '🍁'
  },
  {
    id: '02',
    title: 'Canadian Regions',
    description: 'Explore Canada\'s diverse geographical regions',
    icon: '🗺️'
  },
  {
    id: '03',
    title: 'Rights and Responsibilities',
    description: 'Understand your rights and duties as a Canadian citizen',
    icon: '⚖️'
  },
  {
    id: '04',
    title: 'Canadian Democracy',
    description: 'Learn about Canada\'s system of government',
    icon: '🏛️'
  },
  {
    id: '05',
    title: 'Canadian History',
    description: 'Discover Canada\'s rich historical heritage',
    icon: '📜'
  },
  {
    id: '06',
    title: 'Modern Canada',
    description: 'Explore contemporary Canadian society and values',
    icon: '🌟'
  }
]; 