import React, { FC, memo } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    extraBorder?: string;
};

const Input: FC<InputProps> = ({ className = "", extraBorder = "", ...props }) => {
    return (
        <input
            className={`shadow appearance-none border ${extraBorder} bg-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
            {...props}
        />
    );
};

export default memo(Input);
