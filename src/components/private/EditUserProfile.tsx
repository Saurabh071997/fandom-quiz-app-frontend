import {
  Typography,
  Container,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import MailIcon from "@material-ui/icons/Mail";
import "./UserProfile.css";
import { useAuth } from "../../context/AuthProvider";
import { useQuizData } from "../../context/QuizDataProvider";
import { useWindowSize } from "../../context/useWindowSize";
import { UserProps } from "../../utils/Quiz.type";
import { useStyles } from "../../utils/quizStyle";
import { Loader } from "../Loader";

export const EditUserProfile = () => {
  const classes = useStyles();
  const [, width] = useWindowSize();
  const {
    authState: { currentUser },
    handleUserProfileUpdate,
  } = useAuth();
  const {
    state: { isLoading },
  } = useQuizData();

  const [profileState, setProfileState] = useState<UserProps>({
    avatarname: currentUser?.avatarname!,
    firstname: currentUser?.firstname ? currentUser?.firstname : null,
    lastname: currentUser?.lastname ? currentUser?.lastname : null,
    contact: currentUser?.contact ? currentUser?.contact : null,
  });

  const [error, setError] = useState<boolean>(false);

  const message =
    "Avatar name can only be alpha numeric with @ ,_ ,# and $ allowed";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let profile_img = `https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png`;

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Container maxWidth="sm" className="profile-block">
        <div className="profile-img">
          <img src={profile_img} className="user-img" alt="profile-img" />
        </div>

        <Container maxWidth="sm">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Avatar Name"
                // variant="outlined"
                className={classes.inputFields}
                style={{ width: width < 600 ? "100%" : "60%" }}
                defaultValue={currentUser?.avatarname}
                onChange={(e) => {
                  setProfileState((profileState) => ({
                    ...profileState,
                    avatarname: e.target.value,
                  }));
                  setError(false);
                }}
              />
            </Grid>

            {error && (
              <div
                style={{
                  color: "#EF4444",
                  margin: "0.5rem auto",
                  fontSize: "1rem",
                }}
                className="align-center"
              >
                {message}
              </div>
            )}
            <Grid item>
              <TextField
                label="First Name"
                // variant="outlined"
                className={classes.inputFields}
                style={{ width: width < 600 ? "100%" : "60%" }}
                defaultValue={currentUser?.firstname}
                onChange={(e) => {
                  setProfileState((profileState) => ({
                    ...profileState,
                    firstname: e.target.value,
                  }));
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Last Name"
                // variant="outlined"
                className={classes.inputFields}
                style={{ width: width < 600 ? "100%" : "60%" }}
                defaultValue={currentUser?.lastname}
                onChange={(e) => {
                  setProfileState((profileState) => ({
                    ...profileState,
                    lastname: e.target.value,
                  }));
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Contact"
                // variant="outlined"
                className={classes.inputFields}
                style={{ width: width < 600 ? "100%" : "60%" }}
                defaultValue={currentUser?.contact}
                onChange={(e) => {
                  setProfileState((profileState) => ({
                    ...profileState,
                    contact: e.target.value,
                  }));
                }}
              />
            </Grid>

            <Grid
              item
              className={classes.profileGridItem}
              style={{ cursor: "pointer" }}
            >
              <MailIcon className={classes.profileGridIcon} />
              <Typography className={classes.profileGridText}>
                {currentUser?.email}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "1rem auto",
            fontSize: "1.15rem",
            width: width < 600 ? "100%" : "60%",
          }}
          onClick={() => {
            let regex = /^[a-zA-Z0-9_@#$&]+$/;
            if (!regex.test(profileState?.avatarname)) {
              setError(true);
            } else {
              handleUserProfileUpdate(profileState);
            }
          }}
        >
          Save
        </Button>
      </Container>
    </div>
  );
};
