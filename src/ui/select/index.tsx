import React, { memo } from "react";
import { MAIN_BG } from "constants/styles/backgrounds";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string | number; text: string; imageUrl?: string }[];
    className?: string;
    bgColor?: string;
    border?: string;
};

const Select = ({
    options,
    className = "",
    bgColor = MAIN_BG,
    border = "border-white",
    ...props
}: SelectProps) => {
    return (
        <select
            {...props}
            id="default"
            className={`block px-2 py-1 text-white border rounded ${bgColor} ${border} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        >
            {options.map((o, index) => (
                <option key={index} value={o.value} data-te-select-icon={o.imageUrl}>
                    {o.text}
                </option>
            ))}
        </select>
    );
};
export default memo(Select);
