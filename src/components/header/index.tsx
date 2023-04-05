import { FC, memo } from "react";

import chatIcon from "assets/chatIcon.png";
import { MAIN_BG } from "constants/styles/backgrounds";
import useAuthStore from "store/authStore";
import { Select } from "ui";
import { DEFAULT_BORDER } from "constants/styles/borders";
import { EN, RU } from "constants/langs";
import useLangStore from "store/langStore";

const Header: FC = () => {
    const { logout } = useAuthStore((state) => state);

    const { currentLang, setLang } = useLangStore((state) => state);

    return (
        <header className={`border-b-[1px] ${DEFAULT_BORDER}`}>
            <nav className={`px-[40px] py-[16px] ${MAIN_BG}`}>
                <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex">
                        <img src={chatIcon} className="mr-[10px] h-10" alt="INApp logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            INApp
                        </span>
                    </div>
                    <div className="flex items-center gap-[20px]">
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
                            className="text-xl font-medium text-white cursor-pointer"
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
