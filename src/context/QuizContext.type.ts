import {
    Question,
    QuizCategory,
    UserAnswer,
    // QuizPlayProps,
    LeaderBoardType,
    LeaderBoardProps,
    UserScoreListType,
    UserScoreProps
  } from "../utils/Quiz.type";
  
  export type InitialStateType = {
    categoryList: QuizCategory[];
    // selectedCategory: string | null;
    quizQuestionList: Question[];
    score: number;
    // userName: string | null;
    userAnswerList: UserAnswer[];
    leaderBoardList: LeaderBoardType[];
    userScoreList: UserScoreListType[];
    isPlaying: boolean;
    quizFinished:boolean;
    isLoading: boolean;
  };
  
  export type ContextType = {
    state: InitialStateType;
    dispatch: (action: ActionType) => void;
    // handleQuizPlay: (quizplayObj: QuizPlayProps) => void;
    handleQuizPlay: (categoryId: string) => void;
    getUserScoreList: () => void
    handleUserScoreListUpdate: (userScoreObj: UserScoreProps) => void
    handleLeaderBoardUpdate: (leaderBoardObj: LeaderBoardProps) => void;
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
    | {type:"SET_USER_SCORE_LIST"; payload:{scorelist:UserScoreListType[]}}
    | { type: "TOGGLE_PLAY"; payload: { toggle: boolean } }
    | {type:"TOGGLE_QUIZ_FINISH" ; payload:{toggle:boolean} }
    | { type: "UPDATE_USER_ANSWER"; payload: { answerObj: UserAnswer } }
    // | { type: "SET_USERNAME"; payload: { value: string } }
    | { type: "UPDATE_SCORE"; payload: { value: number } }
    | { type: "INCREMENT_QUESTION_NO" }
    | { type: "SET_QUESTION_LIST"; payload: { questionList: Question[] } }
    | { type: "TOGGLE_LOADER"; payload: { toggle: boolean } }
    | {
        type: "SET_CATEGORY_LIST";
        payload: { categoryList: QuizCategory[] };
      }
    // | { type: "SELECT_CATEGORY"; payload: { category: string } };
  