import {
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";
import { useStyles } from "../utils/quizStyle";
import { SignupErrorTypes } from "../utils/Quiz.type";
import { useAuth } from "../context/AuthProvider";
import { useWindowSize } from "../context/useWindowSize";

type ErrorMessage = {
  message: string;
};

export const ShowErrorMessage = ({ message }: ErrorMessage) => {
  return (
    <div
      style={{ color: "#EF4444", margin: "0.5rem auto", fontSize: "1rem" }}
      className="align-center"
    >
      {message}
    </div>
  );
};

export const SignupPage = () => {
  const classes = useStyles();

  const {
    authState: { authLoader },
    handleUserSignup,
  } = useAuth();

  const [, width] = useWindowSize();

  const [avatarname, setAvatarName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const errorTypes: SignupErrorTypes = {
    avatarNameFormatError: "avatarNameFormatError",
    emailFormatError: "emailFormatError",
    passwordMismatchError: "passwordMismatchError",
    passwordLengthError: "passwordLengthError",
    emptyFieldError: "emptyFieldError",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateSignup = () => {
    if (
      !email ||
      email?.length < 1 ||
      !password ||
      password?.length < 1 ||
      !avatarname ||
      avatarname?.length < 1 ||
      !confirmPassword ||
      confirmPassword?.length < 1
    ) {
      setError(errorTypes.emptyFieldError);
    } else {
      let regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let avatarregex = /^[a-zA-Z0-9_@#$&]+$/;
      if (!regex.test(email)) {
        setError(errorTypes.emailFormatError);
      } else if (!avatarregex.test(avatarname)) {
        setError(errorTypes.avatarNameFormatError);
      } else if (password && confirmPassword && password !== confirmPassword) {
        setError(errorTypes.passwordMismatchError);
      } else if (
        password &&
        password.length < 8 &&
        confirmPassword &&
        confirmPassword?.length < 8
      ) {
        setError(errorTypes.passwordLengthError);
      } else {
        handleUserSignup({ avatarname, email, password });
      }
    }
  };

  return (
    <div className="page-block">
      <Typography align="center" gutterBottom className={classes.pageTitle}>
        Create Account
      </Typography>

      <Container maxWidth="sm" className={classes.credentialsContainer}>
        <div className="align-center">
          <TextField
            label="Avatar Name"
            variant="outlined"
            style={{
              width: width <= 600 ? "100%" : "60%",
              margin: "0.5rem auto",
            }}
            onChange={(e) => {
              setAvatarName(e.target.value);
              setError(null);
            }}
          />
          {error === errorTypes.avatarNameFormatError && (
            <ShowErrorMessage message="Avatar name can only be alpha numeric with @ ,_ ,# and $ allowed" />
          )}

          <TextField
            label="Email"
            variant="outlined"
            style={{
              width: width <= 600 ? "100%" : "60%",
              margin: "0.5rem auto",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
          {error === errorTypes.emailFormatError && (
            <ShowErrorMessage message="Email must be of type something@something.com" />
          )}

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            style={{
              width: width <= 600 ? "100%" : "60%",
              margin: "0.5rem auto",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            style={{
              width: width <= 600 ? "100%" : "60%",
              margin: "0.5rem auto",
            }}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
          />

          {error === errorTypes.passwordMismatchError && (
            <ShowErrorMessage message="Passwords Failed to Match" />
          )}

          {error === errorTypes.passwordLengthError && (
            <ShowErrorMessage message="Password length must be more than 8 characters" />
          )}

          {error === errorTypes.emptyFieldError && (
            <ShowErrorMessage message="All Fields are mandatory" />
          )}

          {/* <div className="align-center"> */}

          <div style={{ margin: "0.5rem auto" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ fontSize: "1.15rem", width: "200px" }}
              onClick={validateSignup}
            >
              {authLoader ? (
                <CircularProgress
                  style={{
                    color: "whitesmoke",
                    height: "1.5rem",
                    width: "1.5rem",
                  }}
                />
              ) : (
                "Sign up"
              )}
            </Button>
          </div>

          <div className="page-nav-txt">
            Already a User?
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              <span className="page-nav-link">Login </span>{" "}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
