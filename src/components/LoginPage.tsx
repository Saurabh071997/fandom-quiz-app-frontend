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
import { useWindowSize } from "../context/useWindowSize";
import { useAuth } from "../context/AuthProvider";
import { ShowErrorMessage } from "./SignupPage";

export const LoginPage = () => {
  const classes = useStyles();
  const [, width] = useWindowSize();

  const {
    authState: { authLoader },
    handleUserLogin,
  } = useAuth();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    if (!email || email?.length < 1 || !password || password?.length < 1) {
      setError(true);
    } else {
      handleUserLogin({ usermail: email, userpassword: password });
    }
  };

  const guestLogin = () => {
    handleUserLogin({ usermail: "guest@mail.com", userpassword: "123456789" });
  };

  return (
    <>
      <div className="page-block">
        <Typography align="center" gutterBottom className={classes.pageTitle}>
          Login
        </Typography>

        <Container maxWidth="sm" className={classes.credentialsContainer}>
          <div className="align-center">
            <TextField
              label="Email"
              variant="outlined"
              style={{
                width: width <= 600 ? "100%" : "60%",
                margin: "0.5rem auto",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
            />

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
                setError(false);
              }}
            />

            {error && (
              <ShowErrorMessage message="Fill all the fields with appropriate values" />
            )}

            <div style={{ margin: "0.5rem auto" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontSize: "1.15rem",
                  width: "200px",
                }}
                onClick={handleLogin}
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
                  "Login"
                )}
              </Button>
            </div>

            <Typography
              align="center"
              variant="subtitle1"
              color="primary"
              gutterBottom
            >
              Or
            </Typography>

            <div style={{ margin: "0.5rem auto" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontSize: "1.15rem",
                  minWidth: "200px",
                }}
                onClick={guestLogin}
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
                  "Login as Guest"
                )}
              </Button>
            </div>

            <div className="page-nav-txt">
              New User?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {" "}
                <span className="page-nav-link">Create Account </span>{" "}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
