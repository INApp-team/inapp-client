import { FC } from "react";
import { black } from "../../constants/styles/colors";

interface ILabel {
    htmlFor: string;
    text: string;
}

const Label: FC<ILabel> = ({ htmlFor, text }) => {
    return (
        <label className={`block ${black} text-sm font-bold mb-2`} htmlFor={htmlFor}>
            {text}
        </label>
    );
};
export default Label;
