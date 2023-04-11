import React, { memo } from "react";
import { bgGray800 } from "constants/styles/backgrounds";
import { white } from "constants/styles/colors";
import { borderWhite } from "constants/styles/borders";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string | number; text: string; imageUrl?: string }[];
    className?: string;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
};

const Select = ({
    options,
    className = "",
    textColor = white,
    backgroundColor = bgGray800,
    borderColor = borderWhite,
    ...props
}: SelectProps) => {
    return (
        <select
            {...props}
            id="default"
            className={`block px-2 py-1 ${textColor} border rounded ${backgroundColor} ${borderColor} ${className}`}
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
