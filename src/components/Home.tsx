import { Container, Typography, Grid, Card, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStyles } from "../utils/quizStyle";
import { useQuizData } from "../context/QuizDataProvider";
import {useAuth} from '../context/AuthProvider'
import { Loader } from "./Loader";
import { useState } from "react";

export const Home = () => {
  const classes = useStyles();
  const {
    state: { categoryList, isLoading },
    dispatch
  } = useQuizData();
  
  const navigate = useNavigate();

  const {authState:{accessToken}} = useAuth();

  const[showLoginModal, setShowLoginModal] = useState<boolean>(false)
  

  // useEffect(() => {
  //   dispatch({ type: "RESET" });
  //   // eslint-disable-next-line 
  // },[]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  let img_bg = "http://valmorganoutdoor.com/wp-content/uploads/2018/09/Photoshop-Template_PR.png";


  const LoginModal = () => {
    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <div
            style={{
              color: "black",
              fontSize: "1.25rem",
              padding: "0.5rem",
              margin: "1.25rem auto"
            }}
          >
            Create Account/Login to Existing Account to play a quiz..
          </div>
          <Link to="/login">
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "1.15rem",
                  padding: "0.5rem 1rem",
                  margin: "0rem auto",
                  border: "none",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                Login
              </button>
            </div>
          </Link>
          <div
            style={{
              position: "absolute",
              right: "0.2em",
              top: "0.2em",
              border: "none",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <IconButton onClick = {()=>setShowLoginModal(false)}>
              <CloseIcon/>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? <Loader/> : (<div className="div-home">
      <div className="home-banner">
        <img src={img_bg} alt="home" className="img-home" />
      </div>

      {showLoginModal && <LoginModal/>}

      <div className="home-content">
        <Typography align="center" variant="h5">
          {" "}
          Select and Play
        </Typography>
        <Container maxWidth="md" className={classes.cardGrid}>
          <Grid container spacing={4}>
            {categoryList.map((category) => {
              return (
                <Grid
                  item
                  key={category?._id}
                  xs={12}
                  sm={6}
                  md={4}
                  onClick={() => {
                    dispatch({ type: "RESET" });
                  }}
                >
                    <Card className={classes.card}
                     onClick = {()=>{
                       if(accessToken){
                         navigate(`/quiz/${category?._id}/${category?.name}`)
                       }else{
                        setShowLoginModal(true)
                       }
                     }}>
                      <img
                        src={category?.imgUrl}
                        alt="img"
                        className={classes.cardMedia}
                      />
                    </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>)  
};
