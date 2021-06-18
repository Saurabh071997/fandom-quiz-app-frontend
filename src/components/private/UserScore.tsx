import { Container, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./UserScore.css";
import { useQuizData } from "../../context/QuizDataProvider";
import { Loader } from "../Loader";
import { useStyles } from "../../utils/quizStyle";
import { ScoreDisplayList, UserScoreListType } from "../../utils/Quiz.type";

export const getScoreDisplayList = (scoreList: UserScoreListType[]) => {
  let resultlist: ScoreDisplayList[] = [];

  scoreList.forEach((scoreObj) => {
    let search = resultlist.some((item) => item?.date === scoreObj?.dateplayed);
    if (search) {
      resultlist = resultlist.map((item) =>
        item?.date === scoreObj?.dateplayed
          ? {
              ...item,
              quizlist: [
                ...item?.quizlist,
                { quizId: scoreObj?.__quizId, score: scoreObj?.score },
              ],
            }
          : item
      );
    } else {
      resultlist.push({
        date: scoreObj?.dateplayed,
        quizlist: [{ quizId: scoreObj?.__quizId, score: scoreObj?.score }],
      });
    }
  });

  return resultlist;
};

export const UserScore = () => {
  const {
    state: { isLoading, userScoreList, categoryList },
    getUserScoreList,
  } = useQuizData();

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUserScoreList();
    // eslint-disable-next-line
  }, []);


  let resultlist: ScoreDisplayList[] = [];

  if (userScoreList.length > 0) {
    resultlist = getScoreDisplayList(userScoreList);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Typography align="center" className={classes.pageTitle} gutterBottom>
        My Scores
      </Typography>

      {userScoreList.length < 1 ? (
        <Container maxWidth="sm">
          <Typography
            align="center"
            gutterBottom
            style={{ fontSize: "2rem", color: "#A3A3A3" }}
          >
            Nothing here yet !!
          </Typography>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              align="center"
              style={{ cursor: "pointer", color: "#A3A3A3" }}
            >
              play some quiz --&gt;
            </Typography>
          </Link>
        </Container>
      ) : (
        <div style={{ marginTop: "3rem" }}>
          <Container maxWidth="sm">
            {resultlist.map((item) => {
              return (
                <div key={item?.date} className="score-container">
                  <Typography className={classes.containerDate}>
                    {item?.date}
                  </Typography>
                  <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
                    {item?.quizlist.map((quizObj, idx) => {
                      const category = categoryList.find(
                        ({ _id }) => _id === quizObj?.quizId
                      );
                      const bgcolor = idx % 2 === 0 ? "#93C5FD" : "#FAFAFA";
                      return (
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          spacing={1}
                          style={{ backgroundColor: bgcolor }}
                        >
                          <Grid item>
                            <Typography style={{fontSize:"1.25rem"}}>{category?.name}</Typography>
                          </Grid>

                          <Grid item>
                            <Typography style={{fontSize:"1.25rem"}}>{quizObj?.score}</Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Container>
                </div>
              );
            })}
          </Container>
        </div>
      )}
    </div>
  );
};
