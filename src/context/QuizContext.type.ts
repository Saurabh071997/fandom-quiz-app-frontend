import {
    Question,
    QuizCategory,
    UserAnswer,
    // QuizPlayProps,
    LeaderBoardType,
    // LeaderBoardProps
  } from "../utils/Quiz.type";
  
  export type InitialStateType = {
    categoryList: QuizCategory[];
    selectedCategory: string | null;
    quizQuestionList: Question[];
    score: number;
    userName: string | null;
    userAnswerList: UserAnswer[];
    leaderBoardList: LeaderBoardType[];
    isPlaying: boolean;
    isLoading: boolean;
  };
  
  export type ContextType = {
    state: InitialStateType;
    dispatch: (action: ActionType) => void;
    // handleQuizPlay: (quizplayObj: QuizPlayProps) => void;
    // handleLeaderBoardUpdate: (leaderBoardObj: LeaderBoardProps) => void;
  };
  
  export type ActionType =
    | {type:"PAGE_RELOAD"}
    | { type: "RESET" }
    | {
        type: "SET_LEADER_BOARD_LIST";
        payload: { leaderBoardList: LeaderBoardType[] };
      }
    | {
        type: "UPDATE_LEADER_BOARD_LIST";
        payload: { leaderBoardObj: LeaderBoardType };
      }
    | { type: "TOGGLE_PLAY"; payload: { toggle: boolean } }
    | { type: "UPDATE_USER_ANSWER"; payload: { answerObj: UserAnswer } }
    | { type: "SET_USERNAME"; payload: { value: string } }
    | { type: "UPDATE_SCORE"; payload: { value: number } }
    | { type: "INCREMENT_QUESTION_NO" }
    | { type: "SET_QUESTION_LIST"; payload: { questionList: Question[] } }
    | { type: "TOGGLE_LOADER"; payload: { toggle: boolean } }
    | {
        type: "SET_CATEGORY_LIST";
        payload: { categoryList: QuizCategory[] };
      }
    | { type: "SELECT_CATEGORY"; payload: { category: string } };
  