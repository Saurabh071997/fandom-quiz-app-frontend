export type QuizCategory = {
    _id: string;
    name: string;
    imgUrl: string;
    bgImgUrl: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  
  export type Option = {
    _id: string;
    value: string;
    isCorrect: boolean;
  };
  
  export type Question = {
    _id: string;
    question: string;
    options: Option[];
  };
  
  export type Quiz = {
    _id: string;
    _categoryId: string;
    questionset: Question[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  
  export type UserAnswer = {
    questionId: string;
    answer: string;
  };
  
  export type CategoryResponse = {
    success: boolean;
    data: QuizCategory[];
  };
  
  export type QuizDataResponse = {
    success: boolean;
    data: Quiz;
  };
  
  export type ServerError = {
    success?: boolean;
    message?: string;
    errorMessage: string;
  };
  
  export type QuizPlayProps = {
    username: string;
    categoryId: string;
  };
  
  export type LeaderBoardType = {
    _id: string;
    username: string;
    quizplayed: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  
  export type LeaderBoardResponse = {
    success: boolean;
    data: LeaderBoardType[];
  };
  
  export type LeaderBoardPostResponse = {
    success: boolean;
    data: LeaderBoardType;
  };
  
  export type LeaderBoardProps = {
    username: string | null;
    quizPlayedId: string;
    score: number;
    totalQuestions: number;
  };
  