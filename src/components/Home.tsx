import { Container, Typography, Grid, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useStyles } from "../utils/quizStyle";
import { useQuizData } from "../context/QuizDataProvider";
// import { Loader } from "./Loader";

export const Home = () => {
  const classes = useStyles();
  const {
    state: { categoryList },
    dispatch
  } = useQuizData();


  useEffect(() => {
    dispatch({ type: "RESET" });
      // eslint-disable-next-line
  },[]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

//   let img_bg ="https://media-exp1.licdn.com/dms/image/C4E1BAQEnc4u23VZjAw/company-background_10000/0/1591973337782?e=2159024400&v=beta&t=jTHTR0_j5qynQk-0wR9j6ZuL0ebuuFtLRGNibPmETlw";
  let img_bg = "http://valmorganoutdoor.com/wp-content/uploads/2018/09/Photoshop-Template_PR.png";

  return (<div className="div-home">
      <div className="home-banner">
        <img src={img_bg} alt="home" className="img-home" />
      </div>

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
                  <Link to={`/quiz/${category?._id}/${category?.name}`}>
                    <Card className={classes.card}>
                      <img
                        src={category?.imgUrl}
                        alt="img"
                        className={classes.cardMedia}
                      />
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>)  
};
