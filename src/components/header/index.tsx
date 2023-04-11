import { FC, memo } from "react";
import useAuthStore from "store/authStore";
import useLangStore from "store/langStore";
import classNames from "classnames";
import { Select } from "ui";

import { EN, RU } from "constants/langs";
import { white } from "constants/styles/colors";
import { borderGray600 } from "constants/styles/borders";
import { bgGray800 } from "constants/styles/backgrounds";
import chatIcon from "assets/chatIcon.png";

const Header: FC = () => {
    const logout = useAuthStore((state) => state.logout);
    const { currentLang, setLang } = useLangStore((state) => state);

    return (
        <header
            className={classNames(
                "absolute w-full border-b-[1px] top-0 h-[theme(layout.headerHeight)]",
                borderGray600
            )}
        >
            <nav className={classNames("px-[40px] h-full", bgGray800)}>
                <div className={"flex h-full justify-between items-center cursor-pointer"}>
                    <div className={"flex"}>
                        <img src={chatIcon} className={"mr-[10px] h-10"} alt="INApp logo" />
                        <span
                            className={classNames(
                                "self-center text-2xl font-semibold whitespace-nowrap",
                                white
                            )}
                        >
                            INApp
                        </span>
                    </div>
                    <div className={"flex items-center gap-[20px]"}>
                        <Select
                            value={currentLang}
                            onChange={(e) => setLang(e.target.value)}
                            options={[
                                { value: RU, text: "Русский" },
                                { value: EN, text: "English" }
                            ]}
                        />
                        <span
                            onClick={logout}
                            className={"text-xl font-medium text-white cursor-pointer"}
                        >
                            Выйти
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default memo(Header);
