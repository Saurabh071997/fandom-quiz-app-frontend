import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { CssBaseline } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useToast } from "./context/ToastProvider";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import { QuizPage } from "./components/private/QuizPage";
import { UserProfile } from "./components/private/UserProfile";
import { EditUserProfile } from "./components/private/EditUserProfile";
import { UserScore } from "./components/private/UserScore";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { LeaderBoard } from "./components/LeaderBoard";
import { Footer } from "./components/Footer";
import { ErrorPage } from "./components/ErrorPage";

const App = () => {
  const {
    toastState: { toastActive, toastMessage },
    toastDispatch,
  } = useToast();

  useEffect(() => {
    function notify() {
      setTimeout(() => {
        toastDispatch({
          type: "TOGGLE_TOAST",
          payload: { toggle: false, message: "" },
        });
        toast(`${toastMessage}`, {
          className: "toast-class",
          closeButton: true,
        });
      }, 1000);
    }

    toastActive && notify();
  }, [toastActive, toastDispatch, toastMessage]);

  return (
    <div className="App">
      <CssBaseline />

      <Navigation />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <PrivateRoute path="/quiz/:quizId/:quizName" element={<QuizPage />} />
          <PrivateRoute path="/userprofile" element={<UserProfile />} />
          <PrivateRoute path="/editprofile" element={<EditUserProfile />} />
          <PrivateRoute path="/userscores" element={<UserScore />} />
        </Routes>
      </div>

      <ToastContainer />

      <Footer />
    </div>
  );
};

export default App;
