import { FC, memo } from "react";
import { red500 } from "constants/styles/colors";

interface IExtraText {
    text: string;
    color?: string;
}

const ExtraText: FC<IExtraText> = ({ color = red500, text }) => {
    return <p className={`${color} text-xs italic`}>{text}</p>;
};
export default memo(ExtraText);
