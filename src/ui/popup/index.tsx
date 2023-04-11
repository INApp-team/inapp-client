import React, { memo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainerProps } from "react-toastify/dist/types";

export const openPopup = (msg: string) => toast(msg);
type TPopup = {
    textColor?: string;
    backgroundColor?: string;
    props?: ToastContainerProps & React.RefAttributes<HTMLDivElement>;
};
const Popup = ({
    textColor = "rgb(209 213 219)",
    backgroundColor = "rgb(55 65 81)",
    props
}: TPopup) => {
    const defaultProps = {
        position: "bottom-left",
        autoClose: 3000,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        hideProgressBar: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        theme: "dark"
    };

    return (
        <ToastContainer
            toastStyle={{ backgroundColor, color: textColor }}
            {...(defaultProps as ToastContainerProps)}
            {...props}
        />
    );
};
export default memo(Popup);
