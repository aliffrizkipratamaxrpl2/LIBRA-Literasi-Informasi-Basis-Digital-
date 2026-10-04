export type Book = {
  id: string;
  title: string;
  author: string;
  rating?: number;
  cover?: string;
  category?: string;
  progress?: number;
  synopsis?: string;
  content?: string;
};

export type BookDetail = Book & {
  synopsis: string;
  pages: number;
  language: string;
  publisher: string;
  publishedDate: string;
  isbn: string;
  formats: string[];
  audiobook?: {
    available: boolean;
    duration?: string;
  };
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  time: string;
  text: string;
};

export type Category = {
  id: string;
  name: string;
  count: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export type ReadingStats = {
  booksCompleted: number;
  pagesRead: number;
  streakDays: number;
  timeSpent: string;
};
