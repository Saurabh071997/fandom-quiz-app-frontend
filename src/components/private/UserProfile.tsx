import { Container, Typography, Grid } from "@material-ui/core";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";
import BarChartIcon from "@material-ui/icons/BarChart";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { useAuth } from "../../context/AuthProvider";
import { useQuizData } from "../../context/QuizDataProvider";
import { useStyles } from "../../utils/quizStyle";
import { Loader } from "../Loader";

export const UserProfile = () => {
  const {
    authState: { currentUser },
    logoutUser,
    getUserProfileData,
  } = useAuth();

  const navigate = useNavigate();

  const classes = useStyles();

  const {
    state: { isLoading },
  } = useQuizData();

  let profile_img = `https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Container maxWidth="xs" className="profile-block">
        <div className="profile-img">
          <img src={profile_img} className="user-img" alt="profile-img" />
        </div>

        <Typography align="center" gutterBottom className={classes.userAvatar}>
          {currentUser?.avatarname}
        </Typography>

        <div className={classes.linkEdit}>
          <Link
            to="/editprofile"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            {" "}
            <span style={{ color: "#0284C7" }}>Edit Profile</span>
          </Link>
        </div>

        <hr />

        <Container maxWidth="xs">
          <Grid container direction="column">
            <Grid item className={classes.profileGridItem}>
              <PersonOutlinedIcon className={classes.profileGridIcon} />
              <Typography className={classes.profileGridText}>
                {currentUser?.firstname ? (
                  currentUser?.firstname
                ) : (
                  <span className="txt-empty"> -- </span>
                )}

                {currentUser?.lastname ? (
                  " " + currentUser?.lastname
                ) : (
                  <span className="txt-empty"> -- </span>
                )}
              </Typography>
            </Grid>

            <Grid item className={classes.profileGridItem}>
              <CallIcon className={classes.profileGridIcon} />
              <Typography className={classes.profileGridText}>
                {currentUser?.contact ? (
                  currentUser?.contact
                ) : (
                  <span className="txt-empty"> -- </span>
                )}
              </Typography>
            </Grid>

            <Grid item className={classes.profileGridItem}>
              <MailIcon className={classes.profileGridIcon} />
              <Typography className={classes.profileGridText}>
                {currentUser?.email}
              </Typography>
            </Grid>

            <Grid
              item
              className={classes.profileGridItem}
              style={{cursor:"pointer"}}
              onClick={() => {
                navigate("/userscores");
              }}
            >
              <BarChartIcon className={classes.profileGridIcon} />
              <Typography className={classes.profileGridText}>
                My Scores
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <button
          className="btn-logout"
          onClick={() => {
            logoutUser();
            navigate("/");
          }}
        >
          Log out
        </button>
      </Container>
    </div>
  );
};
