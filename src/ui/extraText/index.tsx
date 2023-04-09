import { FC, memo } from "react";
import { red500 } from "constants/styles/colors";
import classNames from "classnames";

interface IExtraText {
    text: string;
    textColor?: string;
    className?: string;
}

const ExtraText: FC<IExtraText> = ({ textColor = red500, text, className = "" }) => {
    const styleStr = classNames("text-xs italic", textColor, className);

    return <p className={styleStr}>{text}</p>;
};
export default memo(ExtraText);
