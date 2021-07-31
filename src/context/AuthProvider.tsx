import axios, { AxiosError } from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserSignupProps,
  ServerError,
  UserLoginProps,
  tokenType,
  UserResponse,
  UserProps,
} from "../utils/Quiz.type";
import { AuthContextType, AuthInitialState } from "./AuthContext.type";
import { useToast } from "./ToastProvider";
import {API_URL} from './config'

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

function setupAuthExceptionHandler(
  logoutUser: any,
  navigate: any,
  toastDispatch: any
) {

  const UNAUTHORIZED = 401;
  const FORBIDDEN = 403;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        toastDispatch({
          type: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Unauthorised Access" },
        });
        logoutUser();
        navigate("/login");
      } else if (error?.response?.status === FORBIDDEN) {
        toastDispatch({
          type: "TOGGLE_TOAST",
          payload: { toggle: true, message: "User Session Expired" },
        });
        logoutUser();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );
}

function setupAuthHeaderForServiceCalls(token: string | null) {
  if (token) {

    delete axios.defaults.headers.common["Authorization"];
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }

  delete axios.defaults.headers.common["Authorization"];
}

export const AuthProvider: React.FC = ({ children }) => {
  let token = localStorage?.getItem("accessToken");
  let savedToken: tokenType = token && JSON.parse(token);

  savedToken?.accessToken &&
    setupAuthHeaderForServiceCalls(savedToken?.accessToken);

  const [authState, setAuthState] = useState<AuthInitialState>({
    currentUser: null,
    accessToken: savedToken?.accessToken,
    authLoader:false
  });

  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    savedToken?.accessToken && getUserProfileData();
      setupAuthExceptionHandler(logoutUser, navigate, toastDispatch);
    // eslint-disable-next-line
  }, []);

  const getUserDetails = async (): Promise<UserResponse | ServerError> => {
    try {
      let response = await axios.get(
        `${API_URL}/user/details`
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          // return serverError.response.data;
          if (
            serverError?.response?.status === 400 ||
            serverError?.response?.status === 500
          ) {
            navigate("/error");
          }

          return serverError.response.data;
        }
      }

      // console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  const postUserDetails = async (
    userProfileObj: UserProps
  ): Promise<UserResponse | ServerError> => {
    try {
      let response = await axios.post(
        `${API_URL}/user/details`,
        {
          avatarname: userProfileObj?.avatarname,
          firstname: userProfileObj?.firstname,
          lastname: userProfileObj?.lastname,
          contact: userProfileObj?.contact,
        }
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (serverError?.response?.status === 409) {
            toastDispatch({
              type: "TOGGLE_TOAST",
              payload: {
                toggle: true,
                message: "Avatar name already exists !! ",
              },
            });
          }

          if (
            serverError?.response?.status === 400 ||
            serverError?.response?.status === 500
          ) {
            navigate("/error");
          }
          return serverError.response.data;
        }
      }

      // console.log(err);
      return { success: false, errorMessage: "something went wrong!" };
    }
  };

  async function handleUserSignup({
    avatarname,
    email,
    password,
  }: UserSignupProps) {
    setAuthState(authState => ({...authState, authLoader:true}))
    try {
      let response = await axios.post(
        `${API_URL}/signup`,
        {
          avatarname,
          email,
          password,
        }
      );

      if (response.status === 201) {
        
        let {data:{newUser, accessToken}} = response
        setupAuthHeaderForServiceCalls(accessToken);

        setAuthState((authState) => ({
          ...authState,
          currentUser: newUser,
          accessToken,
        }));

        localStorage?.setItem("accessToken", JSON.stringify({ accessToken }));

        toastDispatch({
          type: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Account Created Successfully" },
        });

        navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (serverError?.response?.status === 409) {
            toastDispatch({
              type: "TOGGLE_TOAST",
              payload: {
                toggle: true,
                message: `User already exists.\nAvatar Name and email must be unique`,
              },
            });
          }
        }
      } else {
        console.error(err);
      }
    }finally{
      setAuthState(authState => ({...authState, authLoader:false}))
    }
  }

  async function handleUserLogin({ usermail, userpassword }: UserLoginProps) {
    setAuthState(authState => ({...authState, authLoader:true}))
    try {
      let response = await axios.post(
        `${API_URL}/login`,
        {
          usermail,
          userpassword,
        }
      );

      if (response.status === 200) {
        let {
          data: { loggedInUser, accessToken },
        } = response;

        setupAuthHeaderForServiceCalls(accessToken);

        setAuthState((authState) => ({
          ...authState,
          currentUser: loggedInUser,
          accessToken,
        }));

        localStorage?.setItem("accessToken", JSON.stringify({ accessToken }));
        navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          if (
            serverError.response?.status === 400 ||
            serverError.response?.status === 401
          ) {
            toastDispatch({
              type: "TOGGLE_TOAST",
              payload: { toggle: true, message: "Invalid Credentials" },
            });
          }
        }
      } else {
        console.error(err);
      }
    }finally{
      setAuthState(authState => ({...authState, authLoader:false}))
    }
  }

  async function getUserProfileData() {
    try {
      let response = await getUserDetails();
      if ("data" in response) {
        let { data: userDetails } = response;
        setAuthState((authState) => ({
          ...authState,
          currentUser: userDetails,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUserProfileUpdate(userProfileObj: UserProps) {
    try {
      let response = await postUserDetails(userProfileObj);
      if ("data" in response) {
        let { data: userDetails } = response;
        setAuthState((authState) => ({
          ...authState,
          currentUser: userDetails,
        }));
        toastDispatch({
          type: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Profile Updated !! " },
        });
        navigate("/userprofile");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function logoutUser() {
    localStorage?.removeItem("accessToken");

    setAuthState((authState) => ({
      ...authState,
      currentUser: null,
      accessToken: null,
      authLoader:false
    }));

    setupAuthHeaderForServiceCalls(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        handleUserSignup,
        handleUserLogin,
        getUserProfileData,
        handleUserProfileUpdate,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
