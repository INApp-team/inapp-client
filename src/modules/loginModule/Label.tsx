import { FC } from "react";
import { black } from "constants/styles/colors";
import classNames from "classnames";

interface ILabel {
    htmlFor: string;
    text: string;
}

const Label: FC<ILabel> = ({ htmlFor, text }) => {
    return (
        <label className={classNames("block text-sm font-bold mb-2", black)} htmlFor={htmlFor}>
            {text}
        </label>
    );
};
export default Label;
