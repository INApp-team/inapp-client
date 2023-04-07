import { FC, memo } from "react";
import { bgGray800 } from "constants/styles/backgrounds";
import { gray500 } from "constants/styles/colors";

const Footer: FC = () => {
    return (
        <footer>
            <nav className={`w-full absolute bottom-0 py-[10px] ${bgGray800}`}>
                <div className="flex justify-center items-center">
                    <span className={`${gray500} font-normal text-sm`}>
                        All rights reserved © INApp {new Date().getFullYear()}
                    </span>
                </div>
            </nav>
        </footer>
    );
};
export default memo(Footer);
