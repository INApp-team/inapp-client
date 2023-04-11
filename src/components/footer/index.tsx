import { FC, memo } from "react";
import classNames from "classnames";

import { bgGray800 } from "constants/styles/backgrounds";
import { gray500 } from "constants/styles/colors";

const Footer: FC = () => {
    return (
        <footer className={classNames("absolute bottom-0 w-full h-[theme(layout.footerHeight)]")}>
            <nav className={classNames("w-full h-full", bgGray800)}>
                <div className={"flex h-full justify-center items-center"}>
                    <span className={classNames("font-normal text-sm", gray500)}>
                        All rights reserved © INApp {new Date().getFullYear()}
                    </span>
                </div>
            </nav>
        </footer>
    );
};
export default memo(Footer);
