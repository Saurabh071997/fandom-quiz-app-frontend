
export type ToastInitialState = {
    toastActive: boolean;
    toastMessage: string;
}

export type ToastContextType = {
    toastState: ToastInitialState;
    toastDispatch: (action: ToastActionType) => void
}

export type ToastActionType = {
    type: "TOGGLE_TOAST";
    payload: {toggle: boolean , message: string}
}