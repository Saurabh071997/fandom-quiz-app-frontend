import { Container, Typography, Grid, Button } from "@material-ui/core";
import { useStyles } from "../../utils/quizStyle";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useQuizData } from "../../context/QuizDataProvider";
import { Loader } from "../Loader";

export const QuizResult = () => {
  const classes = useStyles();
  const {
    state: { userName, score, quizQuestionList, userAnswerList , isLoading}
  } = useQuizData();

  const TOTAL_SCORE = userAnswerList?.length * 5;

  const accuracy = Math.round((score / TOTAL_SCORE) * 100);
  const incorrect = Math.round(100 - accuracy);

  const accuracyWidth = `${accuracy}%`;
  const incorrectWidth = `${incorrect}%`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? <Loader/>:(
    <div>
      <Typography
        align="center"
        variant="h3"
        style={{ margin: "1rem auto" }}
        gutterBottom
      >
        Score Board
      </Typography>

      <Typography align="center" variant="h5" gutterBottom>
        Player: {userName}
      </Typography>

      <Typography align="center" gutterBottom>
        <span className={classes.score}> {score}</span>{" "}
        <span className={classes.scoreTotal}>&#47; {TOTAL_SCORE} </span>
      </Typography>

      <div
        style={{
          margin: "1rem auto",
          textAlign: "center"
        }}
      >
        <Link to="/leaderboard" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "0rem auto" }}
          >
            View LeaderBoard
          </Button>
        </Link>
      </div>

      <Container maxWidth="md">
        <hr style={{ width: "60%" }} />
        <Typography
          align="center"
          variant="h5"
          gutterBottom
          style={{ marginTop: "2rem" }}
        >
          {" "}
          Performance Analysis{" "}
        </Typography>

        <div className="graph">
          <Container maxWidth="sm">
            <Grid container spacing={1} direction="column">
              {accuracy > 0 && (
                <Grid item>
                  <div
                    style={{
                      backgroundColor: "#22C55E",
                      color: "white",
                      width: accuracyWidth,
                      height: "4vh",
                      padding: "0.25rem"
                    }}
                  ></div>{" "}
                  <span style={{ fontSize: "1.2rem" }}>{accuracyWidth}</span>
                </Grid>
              )}
              {incorrect > 0 && (
                <Grid item>
                  <div
                    style={{
                      backgroundColor: "#EF4444",
                      color: "white",
                      width: incorrectWidth,
                      height: "4vh"
                    }}
                  ></div>
                  <span style={{ fontSize: "1.2rem" }}>{incorrectWidth}</span>
                </Grid>
              )}
            </Grid>
          </Container>
        </div>

        <Container maxWidth="sm">
          {userAnswerList.map((item, index) => {
            return (
              <Container
                key={index}
                maxWidth="sm"
                style={{
                  margin: "2rem auto",
                  border: "1px solid #D4D4D4",
                  padding: "1rem"
                }}
              >
                <Typography variant="h5">
                  {quizQuestionList[index]?.question}
                </Typography>

                <Grid container spacing={1} direction="column">
                  {quizQuestionList[index]?.options.map((option) => {
                    let bgColor = "#A3A3A3";
                    if (option?.isCorrect) {
                      bgColor = "#F59E0B";
                    }

                    if (option?._id === item?.answer && option?.isCorrect) {
                      bgColor = "#22C55E";
                    } else if (
                      option?._id === item?.answer &&
                      !option?.isCorrect
                    ) {
                      bgColor = "#DC2626";
                    }
                    return (
                      <Grid item key={option?._id}>
                        <div
                          style={{
                            color: "white",
                            backgroundColor: bgColor
                          }}
                          className={classes.resultOption}
                        >
                          {option?.value}
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};
