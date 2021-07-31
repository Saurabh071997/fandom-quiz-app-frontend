import { BooleanLiteral } from "typescript";

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
  // username: string;
  categoryId: string;
};
  
export type LeaderBoardType = {
  _id: string;
  useravatar: string;
  __quizId: string;
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
  useravatar: string ;
  __quizId: string;
  score: number;
  totalQuestions: number;
};
  
export type UserType = {
  _id:string;
  avatarname: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  contact?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type UserResponse = {
  success:boolean;
  data: UserType;
}

export type UserProps = {
  avatarname : string;
  firstname : string | null;
  lastname : string | null;
  contact : string | null; 
}

export type SignupErrorTypes = {
  avatarNameFormatError:string;
  emailFormatError:string;
  passwordMismatchError:string;
  passwordLengthError:string;
  emptyFieldError:string;
}

export type UserSignupProps = {
  avatarname: string|null;
  email:string | null;
  password:string | null;
}

export type UserLoginProps = {
  usermail: string | null;
  userpassword: string | null;
}

export type tokenType = {
  accessToken:string|null
}

export type UserScoreProps = {
  __quizId: string;
  score: number;
  dateplayed: string;
}

export type UserScoreListType = {
  _id: string;
  __quizId: string;
  score: number;
  dateplayed: string;
}

export type UserScoreResponeType = {
  _id:string;
  __userId: string;
  scorelist: UserScoreListType[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type UserScoreResponse = {
  success:boolean;
  data: UserScoreResponeType;
}

export type QuizScoreObj = {
  quizId: string;
  score: number;
}

export type ScoreDisplayList = {
  date : string;
  quizlist: QuizScoreObj[];
}