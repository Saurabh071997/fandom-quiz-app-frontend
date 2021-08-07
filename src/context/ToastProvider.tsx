import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { ToastActionType, ToastContextType, ToastInitialState } from "./ToastContext.type";

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

export const toastInitialState : ToastInitialState = {
    toastActive:false,
    toastMessage:""
}

export const toastReducer = (state:ToastInitialState , action:ToastActionType) => {
    switch(action.type){
        case "TOGGLE_TOAST":
            return {
                ...state, 
                toastActive: action.payload.toggle,
                toastMessage:action.payload.message }
        default:
            return state
    }
}

export const ToastProvider: React.FC = ({ children }) => {

    const [toastState, toastDispatch] = useReducer(toastReducer,toastInitialState )

  return <ToastContext.Provider value = {{toastState, toastDispatch}}>
      {children}
      </ToastContext.Provider>;
};


export const useToast = () => {
    return useContext(ToastContext)
}