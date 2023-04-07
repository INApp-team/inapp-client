import React, { memo } from "react";
import { bgGray400, bgGray500 } from "constants/styles/backgrounds";
import { white } from "constants/styles/colors";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    icon?: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    hoverColor?: string;
    className?: string;
};

const Button = ({
    backgroundColor = bgGray500,
    textColor = white,
    hoverColor = bgGray400,
    className = "",
    children,
    icon,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${backgroundColor} hover:${hoverColor} ${textColor} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
            type="button"
            {...props}
        >
            {icon && <i className="icon">{icon}</i>}
            {children}
        </button>
    );
};

export default memo(Button);
