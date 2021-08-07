import { Route, Navigate } from "react-router-dom";
import {tokenType} from '../utils/Quiz.type'


export const PrivateRoute = ({ path, ...props }: any) => {

  let token = localStorage?.getItem('accessToken')
  let savedToken:tokenType = token && JSON.parse(token)

  return savedToken?.accessToken ? (
    <Route {...props} path={path} />
  ) : (
    // <Route path="/" element={<Home />} />
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
