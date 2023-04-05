import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { RU, LANGS } from "constants/langs";

export interface IUseAuthStore {
    currentLang: string;
    setLang: (l: string) => void;
}

const useLangStore = create<IUseAuthStore>()(
    devtools(
        immer((set, get) => ({
            currentLang: RU,
            setLang: (lang: string) => {
                if (LANGS.includes(lang)) {
                    set({ currentLang: lang });
                }
            }
        }))
    )
);

export default useLangStore;
