import React, { memo } from "react";
import { MEDIUM_LIGHT_BG } from "constants/styles/backgrounds";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    background?: string;
};

const Button = ({
    background = MEDIUM_LIGHT_BG,
    className = "",
    children,
    icon,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${background} hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
            type="button"
            {...props}
        >
            {icon && <i className="icon">{icon}</i>}
            {children}
        </button>
    );
};

export default memo(Button);
