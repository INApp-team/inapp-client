import { FC } from "react";

interface ILabel {
    htmlFor: string;
    text: string;
}

const Label: FC<ILabel> = ({ htmlFor, text }) => {
    return (
        <label className="block text-black text-sm font-bold mb-2" htmlFor={htmlFor}>
            {text}
        </label>
    );
};
export default Label;
