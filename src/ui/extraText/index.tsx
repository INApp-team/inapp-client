import { FC, memo } from "react";

interface IExtraText {
    text: string;
    color?: string;
}

const ExtraText: FC<IExtraText> = ({ color = "text-red-500", text }) => {
    return <p className={`${color} text-xs italic`}>{text}</p>;
};
export default memo(ExtraText);
