import React, { memo } from "react";
import { bgGray500 } from "constants/styles/backgrounds";
import { white } from "constants/styles/colors";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    icon?: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    hover?: string;
    className?: string;
};

const Button = ({
    backgroundColor = bgGray500,
    textColor = white,
    hover = "hover:bg-gray-400",
    className = "",
    children,
    icon,
    ...props
}: ButtonProps) => {
    const classStr = classNames(
        "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
        backgroundColor,
        hover,
        textColor,
        className
    );

    return (
        <button className={classStr} type="button" {...props}>
            {icon && <i className="icon">{icon}</i>}
            {children}
        </button>
    );
};

export default memo(Button);
