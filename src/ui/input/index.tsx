import React, { FC, memo } from "react";
import { gray700 } from "constants/styles/colors";
import { bgGray300 } from "constants/styles/backgrounds";
import classNames from "classnames";

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
    const styleStr = classNames(
        "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
        backgroundColor,
        textColor,
        className
    );

    return <input className={styleStr} {...props} />;
};

export default memo(Input);
