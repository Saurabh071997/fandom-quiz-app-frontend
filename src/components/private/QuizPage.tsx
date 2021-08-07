import { Typography, Container } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuizData } from "../../context/QuizDataProvider";
import { Loader } from "../Loader";
import { QuizCategory } from "../../utils/Quiz.type";
import { useStyles } from "../../utils/quizStyle";
import { QuizPlay } from "./QuizPlay";
import { QuizResult } from "./QuizResult";

export const QuizInstructions = ({ ...quizCategory }: QuizCategory) => {
  const classes = useStyles();

  const { dispatch } = useQuizData();

  return (
    <Container maxWidth="sm" className={classes.quizContainer}>
      <Typography align="center" className={classes.pageHead}>
        {quizCategory?.name + " Quiz"}
      </Typography>

      <Container maxWidth="xs" className={classes.quizSubContainer}>
        <Typography
          align="center"
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          Instructions
        </Typography>

        <Typography align="left" variant="subtitle1" gutterBottom>
          &gt;&nbsp;Each Question must be answered
        </Typography>
        <Typography align="left" variant="subtitle1" gutterBottom>
          &gt;&nbsp;Each correct answer will award you 5 points
        </Typography>
        <Typography align="left" variant="subtitle1" gutterBottom>
          &gt;&nbsp;Each incorrect answer would deduct 2 points
        </Typography>

        <Typography align="left" variant="subtitle1" gutterBottom>
          &gt;&nbsp;Score atleast 70% to be featured on leaderboard
        </Typography>

        <Typography align="left" variant="subtitle1" gutterBottom>
          &gt;&nbsp;Avoid refreshing page while playing else all progress will
          be lost
        </Typography>
      </Container>

      <button
        className="btn-play"
        onClick={() => {
          dispatch({ type: "TOGGLE_PLAY", payload: { toggle: true } });
        }}
      >
        Play Quiz{" "}
        <PlayArrowIcon
          style={{ color: "white", position: "relative", top: "0.2em" }}
        />
      </button>
    </Container>
  );
};

export const QuizPage = () => {
  const { quizId } = useParams();
  const {
    state: { categoryList, isLoading, isPlaying, quizFinished },
    dispatch,
    handleQuizPlay,
  } = useQuizData();

  let selectedCategory = categoryList?.find(({ _id }) => _id === quizId);
  let quizCategory = selectedCategory!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    dispatch({type:"RESET"})
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    handleQuizPlay(quizId);
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {!isPlaying && !quizFinished && <QuizInstructions {...quizCategory} />}
      {isPlaying && !quizFinished && <QuizPlay />}
      {!isPlaying && quizFinished && <QuizResult />}
    </>
  );
};
