import { FC, memo } from "react";
import { MAIN_BG } from "constants/styles/backgrounds";

const Footer: FC = () => {
    return (
        <footer>
            <nav className={`w-full absolute bottom-0 py-[10px] ${MAIN_BG}`}>
                <div className="flex justify-center items-center">
                    <span className="text-gray-500 font-normal text-sm">
                        All rights reserved © INApp {new Date().getFullYear()}
                    </span>
                </div>
            </nav>
        </footer>
    );
};
export default memo(Footer);
