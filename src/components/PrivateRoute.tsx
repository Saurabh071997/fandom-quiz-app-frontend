import { Route } from "react-router-dom";
import { useQuizData } from "../context/QuizDataProvider";
import { Home } from "./Home";

export const PrivateRoute = ({ path, ...props }: any) => {
  const {
    state: { isPlaying }
  } = useQuizData();

  return isPlaying ? (
    <Route {...props} path={path} />
  ) : (
    <Route path="/" element={<Home />} />
    // <Navigate state={{ from: path }} replace to="/" />
  );
};
