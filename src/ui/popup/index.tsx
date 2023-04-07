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
    return (
        <ToastContainer
            toastStyle={{ backgroundColor, color: textColor }}
            position="bottom-left"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            hideProgressBar
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
            {...props}
        />
    );
};
export default memo(Popup);
