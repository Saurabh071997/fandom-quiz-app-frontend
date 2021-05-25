import { Container, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useQuizData } from "../context/QuizDataProvider";
import { Loader } from "./Loader";

export const LeaderBoard = () => {
  const {
    state: { leaderBoardList, categoryList, isLoading}
  } = useQuizData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sortedList = leaderBoardList.sort((a, b) => b.score - a.score);

  return isLoading ? <Loader/> : (
    <div>
      <Typography
        align="center"
        variant="h4"
        style={{ margin: "1rem auto" }}
        gutterBottom
      >
        LeaderBoard
      </Typography>

      {leaderBoardList.length < 1 ? (
        <Container maxWidth="md">
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
        <Container maxWidth="sm">
          {sortedList?.map((item) => {
            let category = categoryList?.find(
                // eslint-disable-next-line
              ({ _id }) => _id === item?.quizplayed
            );
            return (
              <div key={item?._id}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="space-between"
                  style={{
                    margin: "1rem 0rem",
                    borderBottom: "1px solid gray"
                  }}
                >
                  <Grid item>
                    <Typography
                      style={{ fontSize: "1.5rem", color: "#075985" }}
                    >
                      {item?.username}
                    </Typography>
                    <Typography align="center" style={{ fontSize: "1.15rem" }}>
                      Quiz played : {category?.name}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      style={{ fontSize: "1.5rem", color: "#075985" }}
                      gutterBottom
                    >
                      {item?.score}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Container>
      )}
    </div>
  );
};
