import {UserType, UserSignupProps, UserLoginProps, UserProps} from '../utils/Quiz.type'

export type AuthInitialState = {
    currentUser: UserType | null;
    accessToken: string | null;
}

export type AuthContextType = {
    authState: AuthInitialState;
    handleUserSignup: (userSignupObj: UserSignupProps) => void;
    handleUserLogin: (userLoginObj:UserLoginProps ) => void;
    getUserProfileData: () => void;
    handleUserProfileUpdate: (userProfileObj: UserProps) => void;
    logoutUser: () => void;
}