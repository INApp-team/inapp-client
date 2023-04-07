import React, { FC, memo } from "react";
import { gray700 } from "constants/styles/colors";
import { bgGray300 } from "constants/styles/backgrounds";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    textColor?: string;
    backgroundColor?: string;
    className?: string;
    extraBorder?: string;
};

const Input: FC<InputProps> = ({
    textColor = gray700,
    backgroundColor = bgGray300,
    className = "",
    ...props
}) => {
    return (
        <input
            className={`shadow appearance-none border ${backgroundColor} rounded w-full py-2 px-3 ${textColor} leading-tight focus:outline-none focus:shadow-outline ${className}`}
            {...props}
        />
    );
};

export default memo(Input);
