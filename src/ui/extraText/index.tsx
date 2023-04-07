import { FC, memo } from "react";
import { red500 } from "constants/styles/colors";

interface IExtraText {
    text: string;
    textColor?: string;
    className?: string;
}

const ExtraText: FC<IExtraText> = ({ textColor = red500, text, className = "" }) => {
    return <p className={`${textColor} text-xs italic ${className}`}>{text}</p>;
};
export default memo(ExtraText);
