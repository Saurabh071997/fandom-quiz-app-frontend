import { createContext, useContext, useReducer, useEffect } from "react";
import React from "react";
import axios, { AxiosError } from "axios";
import { ContextType } from "./QuizContext.type";
import { quizDataReducer, initialState } from "./quizDataReducer";
import {
  CategoryResponse,
  ServerError
} from "../utils/Quiz.type";

export const QuizDataContext = createContext<ContextType>({} as ContextType);

export const QuizDataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(quizDataReducer, initialState);

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
          return serverError.response.data;
        }
      }

      console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

//   const getQuizData = async (
//     categoryId: string
//   ): Promise<QuizDataResponse | ServerError> => {
//     try {
//       let response = await axios.get(
//         `https://fandom-quiz.herokuapp.com/quiz/${categoryId}`
//       );
//       return response.data;
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         const serverError = err as AxiosError<ServerError>;
//         if (serverError && serverError.response) {
//           return serverError.response.data;
//         }
//       }

//       console.log(err);
//       return { success: false, errorMessage: "something went wrong!" };
//     }
//   };

//   const getLeaderBoardData = async (): Promise<
//     LeaderBoardResponse | ServerError
//   > => {
//     try {
//       let response = await axios.get(
//         "https://fandom-quiz.herokuapp.com/leaderboard"
//       );
//       return response.data;
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         const serverError = err as AxiosError<ServerError>;
//         if (serverError && serverError.response) {
//           return serverError.response.data;
//         }
//       }

//       console.log(err);
//       return { success: false, errorMessage: "something went wrong!" };
//     }
//   };

//   const postLeaderBoardData = async (
//     leaderBoardObj: LeaderBoardProps
//   ): Promise<LeaderBoardPostResponse | ServerError> => {
//     try {
//       let response = await axios.post(
//         `https://fandom-quiz.herokuapp.com/leaderboard`,
//         {
//           username: leaderBoardObj?.username,
//           quizplayed: leaderBoardObj?.quizPlayedId,
//           score: leaderBoardObj?.score
//         }
//       );

//       return response.data;
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         const serverError = err as AxiosError<ServerError>;
//         if (serverError && serverError.response) {
//           return serverError.response.data;
//         }
//       }

//       console.log(err);
//       return { success: false, errorMessage: "something went wrong!" };
//     }
//   };

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
      try {
        let response = await getCategories();
        if ("data" in response) {
          dispatch({
            type: "SET_CATEGORY_LIST",
            payload: { categoryList: response.data }
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
  }, []);

//   useEffect(() => {
//     (async function () {
//       dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
//       try {
//         let response = await getLeaderBoardData();

//         if ("data" in response) {
//           dispatch({
//             type: "SET_LEADER_BOARD_LIST",
//             payload: { leaderBoardList: response.data }
//           });
//         } else {
//           console.log(response.errorMessage);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
//       }
//     })();
//   }, []);

//   const handleQuizPlay = async (quizPlayObj: QuizPlayProps) => {
//     dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
//     try {
//       let response = await getQuizData(quizPlayObj.categoryId);
//       if ("data" in response) {
//         let {
//           data: { questionset }
//         } = response;
//         dispatch({
//           type: "SET_USERNAME",
//           payload: { value: quizPlayObj.username }
//         });
//         dispatch({
//           type: "SET_QUESTION_LIST",
//           payload: { questionList: questionset }
//         });

//         dispatch({ type: "TOGGLE_PLAY", payload: { toggle: true } });
//       } else {
//         console.log(response.errorMessage);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
//     }
//   };

//   const handleLeaderBoardUpdate = async (leaderBoardObj: LeaderBoardProps) => {
//     dispatch({ type: "TOGGLE_LOADER", payload: { toggle: true } });
//     try {
//       let scorePercent =
//         (leaderBoardObj?.score / (leaderBoardObj?.totalQuestions * 5)) * 100;

//       if (scorePercent >= 70) {
//         let response = await postLeaderBoardData(leaderBoardObj);
//         if ("data" in response) {
//           dispatch({
//             type: "UPDATE_LEADER_BOARD_LIST",
//             payload: { leaderBoardObj: response.data }
//           });
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       dispatch({ type: "TOGGLE_LOADER", payload: { toggle: false } });
//     }
//   };

  return (
    <QuizDataContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </QuizDataContext.Provider>
  );
};

export function useQuizData() {
  return useContext(QuizDataContext);
}
