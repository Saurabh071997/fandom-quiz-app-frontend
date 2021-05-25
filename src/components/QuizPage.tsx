import { Container, Typography, Grid, Button, Input } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import { useStyles } from "../utils/quizStyle";
import { useState, useEffect } from "react";
import { useQuizData } from "../context/QuizDataProvider";
// import { Loader } from "./Loader";

export const QuizPage = () => {
  const classes = useStyles();
  const { quizId } = useParams();
  const {
    state: { categoryList }, handleQuizPlay
  } = useQuizData();
  const navigate = useNavigate();

  const [showPlayModal, setShowPlayModal] = useState<boolean>(false);
  const [showInstructionModal, setShowInstructionModal] = useState<boolean>(false);

  let img_bg =
    "https://www.pngkit.com/png/full/20-205143_fandom-heart-icon-fandom-logo.png";

// eslint-disable-next-line
  const currentCategory = categoryList.find(({ _id }) => _id == quizId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const QuizInstructionModal = () => {
    return (
      <div className="modal-div">
        <div className="modal-sub-div">
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
            &gt;&nbsp;Avoid refreshing page while playing else all progress
            will be lost
          </Typography>

          <div style={{ margin: "1rem auto" }}>
            <button
              className="btn-close"
              onClick={() => {
                setShowInstructionModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const QuizPlayModal = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [inputError, setInputError] = useState<boolean>(false);
    const [nameError, setNameError ] = useState<boolean>(false);
    let errormsg = "Provide a username !! ";
    let nameErrormsg = "Username can only be alphanumeric and not more than 10 character long";

    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <Typography
            align="center"
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            Player Credentials
          </Typography>
          <Container>
            <form noValidate autoComplete="off">
              <Input
                placeholder="Username"
                inputProps={{ "aria-label": "description" }}
                onChange={(e) => {
                  let input = e.target.value;
                  setUsername(input);
                  setNameError(false);
                  setInputError(false);
                }}
              />
            </form>
            {inputError && (
              <div style={{ fontSize: "0.85rem", color: "#EF4444" }}>
                {errormsg}
              </div>
            )}

            {nameError && (
              <Container maxWidth="xs" style={{ fontSize: "0.85rem", color: "#EF4444"}}>
                {nameErrormsg}
              </Container>
            )}

            <Grid
              container
              alignItems="center"
              justify="space-evenly"
              style={{ margin: "1rem auto" }}
            >
              <Grid item>
                <button
                  className="btn-submit"
                  // disabled={username === null || username.length < 1}
                  onClick={() => {
                    if (username === null || username.length < 1) {
                      setInputError(true);
                    } else {
                        let re = /^([a-zA-Z0-9]){1,10}$/i
                        if(!re.test(username)){
                            setNameError(true)
                        }else{
                            let quizPlayObj = { username, categoryId: quizId };
                              handleQuizPlay(quizPlayObj);
                              navigate(`/quiz/${quizId}/play`);
                            setShowPlayModal(false)
                            console.log("quizPlayObj : ",quizPlayObj )
                        }
                    }
                  }}
                >
                  Submit
                </button>
              </Grid>

              <Grid item>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setShowPlayModal(false);
                  }}
                >
                  Cancel
                </button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    );
  };
  return (
    <div className="quiz-home">
      <Container maxWidth="sm" className={classes.quizContainer}>
        <img src={img_bg} className={classes.quizBgImg} alt="img" />
        {showInstructionModal && <QuizInstructionModal />}
        {showPlayModal && <QuizPlayModal />}
        <Container maxWidth="sm" className={classes.quizSubContainer}>
          {currentCategory?.name && (
            <div className="page-head">{currentCategory?.name + " Quiz"}</div>
          )}
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowInstructionModal(false);
                  setShowPlayModal(true);
                }}
              >
                Play Quiz
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowPlayModal(false);
                  setShowInstructionModal(true);
                }}
              >
                Instructions
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
};
