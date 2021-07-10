import { Container, Typography, Grid } from "@material-ui/core";
import { useStyles } from "../../utils/quizStyle";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {useAuth} from '../../context/AuthProvider'
import { useQuizData } from "../../context/QuizDataProvider";
import { Option, UserScoreProps, LeaderBoardProps} from "../../utils/Quiz.type";
import { Loader } from "../Loader";

export const QuizPlay = () => {
  const classes = useStyles();
  const { quizId } = useParams();
  const navigate = useNavigate();
  const {
    state: {
      quizQuestionList,
      categoryList,
      // userName,
      userAnswerList,
      score,
      isLoading
    },
    dispatch,
    handleUserScoreListUpdate,
    handleLeaderBoardUpdate
  } = useQuizData();

  const {authState:{currentUser}} = useAuth()

  const TOTAL_QUESTIONS = quizQuestionList?.length;
  // const TOTAL_QUESTIONS = 5;

// eslint-disable-next-line
  const currentCategory = categoryList?.find(({ _id }) => _id === quizId);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [currentQuestionNo, setCurrentQuestionNo] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ExitModal = () => {
    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <Typography variant="h6" gutterBottom>
            Are you sure to Quit Playing ?{" "}
          </Typography>
          <Grid container justify="space-evenly">
            <Grid item>
              <button
                className={classes.btnModal}
                onClick={() => {
                  dispatch({ type: "RESET" });
                  navigate("/");
                }}
              >
                Yes <CheckIcon className={classes.modalIcon} />{" "}
              </button>
            </Grid>

            <Grid item>
              <button
                className={classes.btnModal}
                onClick={() => {
                  setShowExitModal(false);
                }}
              >
                No <ClearIcon className={classes.modalIcon} />
              </button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const checkAnswer = (selectedOption: Option) => {
    setIsAnswered(true);
    dispatch({
      type: "UPDATE_USER_ANSWER",
      payload: {
        answerObj: {
          questionId: quizQuestionList[currentQuestionNo]?._id,
          answer: selectedOption?._id
        }
      }
    });

    let scoreValue = selectedOption?.isCorrect ? 5 : -2;
    dispatch({ type: "UPDATE_SCORE", payload: { value: scoreValue } });
  };

  const incrementQuestion = () => {
    let nextQuestion = currentQuestionNo + 1;
    if (nextQuestion === TOTAL_QUESTIONS - 1) {
      setIsFinished(true);
    }
    setCurrentQuestionNo((currentQuestionNo) => currentQuestionNo + 1);
    setIsAnswered(false);
  };

  const scoreUpdate = () => {
    let dateString = new Date().toDateString().slice(4,)
    let userScoreObj: UserScoreProps = {
      __quizId: quizId,
      score,
      dateplayed:dateString
    }
    handleUserScoreListUpdate(userScoreObj)

    let leaderBoardObj: LeaderBoardProps = {
      useravatar: currentUser?.avatarname!,
      __quizId: quizId,
      score,
      totalQuestions: TOTAL_QUESTIONS
    };

    handleLeaderBoardUpdate(leaderBoardObj);

  }


  return isLoading ? <Loader/> :(
    <div style={{ marginBottom: "5rem" }}>
      <Container maxWidth="md">
        <Typography
          align="center"
          gutterBottom
          style={{ fontSize: "2.5rem", margin: "1rem auto" }}
        >
          {currentCategory?.name + " Quiz"}
        </Typography>

        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography style={{ fontSize: "1.15rem" }}>
              Question No:
            </Typography>
            <Typography style={{ fontSize: "1.5rem" }}>
              {currentQuestionNo + 1} &#47; {TOTAL_QUESTIONS}
            </Typography>
          </Grid>

          <Grid item>
            <Typography style={{ fontSize: "1.15rem" }}>
              Playing as :
            </Typography>
            <Typography align="right" style={{ fontSize: "1.5rem" }}>
              {/* {userName} */}
              {currentUser?.avatarname}
            </Typography>
          </Grid>
        </Grid>
        <div style={{ height: "3vh" }}></div>

        {showExitModal && <ExitModal />}

        {/* {score} */}

        <Container maxWidth="sm">
          <Typography gutterBottom className={classes.quizQuestion}>
            {quizQuestionList[currentQuestionNo]?.question}
          </Typography>

          <Grid container spacing={3} direction="column">
            {quizQuestionList[currentQuestionNo]?.options.map((option) => {
              return (
                <Grid item key={option?._id}>
                  {/* {option.value} */}
                  <button
                    disabled={
                      isAnswered || userAnswerList?.length === TOTAL_QUESTIONS
                    }
                    className={
                      isAnswered &&
                      option?._id === userAnswerList[currentQuestionNo].answer
                        ? classes.quizOptionSelected
                        : classes.quizOption
                    }
                    onClick={() => {
                      checkAnswer(option);
                    }}
                  >
                    {option?.value}
                  </button>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <div style={{ height: "5vh" }}></div>

        <Grid container justify="space-between">
          <Grid item>
            {isAnswered && !isFinished && (
              <button
                className={classes.btnNavigate}
                onClick={() => {
                  incrementQuestion();
                }}
              >
                NEXT
              </button>
            )}

            {isAnswered && isFinished && (
              <button
                className={classes.btnFinish}
                onClick={() => {
                  dispatch({type:"TOGGLE_PLAY", payload:{toggle:false}})
                  dispatch({type:"TOGGLE_QUIZ_FINISH", payload:{toggle:true}})
                  scoreUpdate()
                }}
              >
                FINISH
              </button>
            )}
          </Grid>

          <Grid item>
            <button
              className={classes.btnNavigate}
              onClick={() => {
                setShowExitModal(true);
              }}
            >
              EXIT
            </button>
          </Grid>
        </Grid>

        <div style={{height:"5vh"}}></div>
        
      </Container>
    </div>
  );
};
