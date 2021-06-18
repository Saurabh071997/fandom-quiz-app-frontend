import { createContext, useContext, useReducer, useEffect } from "react";
import React from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ContextType } from "./QuizContext.type";
import { quizDataReducer, initialState } from "./quizDataReducer";
import {
  CategoryResponse,
  QuizDataResponse,
  // QuizPlayProps,
  LeaderBoardResponse,
  LeaderBoardProps,
  LeaderBoardPostResponse,
  ServerError,
  UserScoreResponse,
  UserScoreProps,
} from "../utils/Quiz.type";

export const QuizDataContext = createContext<ContextType>({} as ContextType);

export const QuizDataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(quizDataReducer, initialState);

  const navigate = useNavigate();

  const getCategories = async (): Promise<CategoryResponse | ServerError> => {
    try {
      let response = await axios.get<CategoryResponse>(
        "https://fandom-quiz.herokuapp.com/categories"
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (
            serverError?.response?.status === 400 ||
            serverError?.response?.status === 500
          ) {
            navigate("/error");
          }
          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  const getQuizData = async (
    categoryId: string
  ): Promise<QuizDataResponse | ServerError> => {
    try {
      let response = await axios.get(
        `https://fandom-quiz.herokuapp.com/quiz/${categoryId}`
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (serverError?.response?.status === 500) {
            navigate("/error");
          }

          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  const getLeaderBoardData = async (): Promise<
    LeaderBoardResponse | ServerError
  > => {
    try {
      let response = await axios.get(
        "https://fandom-quiz.herokuapp.com/leaderboard"
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  const getUserScores = async (): Promise<UserScoreResponse | ServerError> => {
    try {
      let response = await axios.get(
        `https://fandom-quiz.herokuapp.com/scores/users`
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (
            serverError?.response?.status === 400 ||
            serverError?.response?.status === 500
          ) {
            navigate("/error");
          }
          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  const postUserScores = async (
    userScoreObj: UserScoreProps
  ): Promise<UserScoreResponse | ServerError> => {
    try {
      let response = await axios.post(
        `https://fandom-quiz.herokuapp.com/scores/users`,
        {
          __quizId: userScoreObj?.__quizId,
          score: userScoreObj?.score,
          dateplayed: userScoreObj?.dateplayed,
        }
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (
            serverError?.response?.status === 400 ||
            serverError?.response?.status === 500
          ) {
            navigate("/error");
          }
          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  const postLeaderBoardData = async (
    leaderBoardObj: LeaderBoardProps
  ): Promise<LeaderBoardPostResponse | ServerError> => {
    try {
      let response = await axios.post(
        `https://fandom-quiz.herokuapp.com/leaderboard`,
        {
          useravatar: leaderBoardObj?.useravatar,
          __quizId: leaderBoardObj?.__quizId,
          score: leaderBoardObj?.score,
        }
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
      try {
        let response = await getCategories();
        if ("data" in response) {
          dispatch({
            type: "SET_CATEGORY_LIST",
            payload: { categoryList: response.data },
          });
        } else {
          console.log(response.errorMessage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
      try {
        let response = await getLeaderBoardData();

        if ("data" in response) {
          dispatch({
            type: "SET_LEADER_BOARD_LIST",
            payload: { leaderBoardList: response.data },
          });
        } else {
          console.log(response.errorMessage);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
      }
    })();
  }, []);

  const getUserScoreList = async () => {
    dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
    try {
      let response = await getUserScores();
      if ("data" in response) {
        let {
          data: { scorelist },
        } = response;

        dispatch({ type: "SET_USER_SCORE_LIST", payload: { scorelist } });
      } else {
        console.log(response?.errorMessage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
    }
  };

  const handleUserScoreListUpdate = async (userScoreObj: UserScoreProps) => {
    dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
    try {
      let response = await postUserScores(userScoreObj);

      if ("data" in response) {
        let {
          data: { scorelist },
        } = response;
        dispatch({ type: "SET_USER_SCORE_LIST", payload: { scorelist } });
        // console.log("User score list updated : ", scorelist);
      } else {
        console.log(response?.errorMessage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
    }
  };

  const handleQuizPlay = async (categoryId: string) => {
    dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
    try {
      let response = await getQuizData(categoryId);
      if ("data" in response) {
        let {
          data: { questionset },
        } = response;

        dispatch({
          type: "SET_QUESTION_LIST",
          payload: { questionList: questionset },
        });

      } else {
        console.log(response?.errorMessage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
    }
  };

  const handleLeaderBoardUpdate = async (leaderBoardObj: LeaderBoardProps) => {
    dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
    try {
      let scorePercent =
        (leaderBoardObj?.score / (leaderBoardObj?.totalQuestions * 5)) * 100;

      if (scorePercent >= 70) {
        let response = await postLeaderBoardData(leaderBoardObj);
        if ("data" in response) {
          dispatch({
            type: "UPDATE_LEADER_BOARD_LIST",
            payload: { leaderBoardObj: response.data },
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
    }
  };

  return (
    <QuizDataContext.Provider
      value={{
        state,
        dispatch,
        handleQuizPlay,
        handleLeaderBoardUpdate,
        getUserScoreList,
        handleUserScoreListUpdate,
      }}
    >
      {children}
    </QuizDataContext.Provider>
  );
};

export function useQuizData() {
  return useContext(QuizDataContext);
}
