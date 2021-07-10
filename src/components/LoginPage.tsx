import { Typography, Container, TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";
import { useStyles } from "../utils/quizStyle";
import { useWindowSize } from "../context/useWindowSize";
import { useAuth } from "../context/AuthProvider";

export const LoginPage = () => {
  const classes = useStyles();
  const [, width] = useWindowSize();

  const { handleUserLogin } = useAuth();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-block">
        <Typography align="center" gutterBottom className={classes.pageTitle}>
          Login
        </Typography>

        <Container maxWidth="sm" className={classes.credentialsContainer}>
          <TextField
            // id="outlined-basic"
            label="Email"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            // id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="align-center">
            <div className="page-nav-txt">
              New User?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {" "}
                <span className="page-nav-link">Create Account </span>{" "}
              </Link>
            </div>

            <div style={{ margin: "1rem auto" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "1.25rem" }}
                onClick={() => {
                  handleUserLogin({ usermail: email, userpassword: password });
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
