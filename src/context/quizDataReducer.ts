import { ActionType, InitialStateType } from "./QuizContext.type";

export const initialState: InitialStateType = {
  categoryList: [],
  // selectedCategory: null,
  quizQuestionList: [],
  score: 0,
  // userName: null,
  userAnswerList: [],
  leaderBoardList: [],
  userScoreList:[],
  isPlaying: false,
  quizFinished:false,
  isLoading: false
};

export function quizDataReducer(state: InitialStateType, action: ActionType) {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        quizQuestionList: [],
        score: 0,
        userAnswerList: [],
        isPlaying: false,
        quizFinished:false
      };

    case "SET_CATEGORY_LIST":
      return { ...state, categoryList: action.payload.categoryList };

    case "SET_QUESTION_LIST":
      return { ...state, quizQuestionList: action.payload.questionList };
    
    case "SET_USER_SCORE_LIST":
      return {...state, userScoreList:action.payload.scorelist}

    case "SET_LEADER_BOARD_LIST":
      return { ...state, leaderBoardList: action.payload.leaderBoardList };

    case "UPDATE_LEADER_BOARD_LIST":
      return {
        ...state,
        leaderBoardList: [
          ...state.leaderBoardList,
          action.payload.leaderBoardObj
        ]
      };

    case "UPDATE_USER_ANSWER":
      return {
        ...state,
        userAnswerList: [...state.userAnswerList, action.payload.answerObj]
      };

    case "UPDATE_SCORE":
      return { ...state, score: state.score + action.payload.value };

    case "TOGGLE_PLAY":
      return { ...state, isPlaying: action.payload.toggle };

    case "TOGGLE_QUIZ_FINISH":
      return {...state, quizFinished:action.payload.toggle}

    case "TOGGLE_LOADER":
      return { ...state, isLoading: action.payload.toggle };
    default:
      return state;
  }
}
