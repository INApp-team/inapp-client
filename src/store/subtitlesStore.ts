import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import checkSpeechRecognitionAvailable from "utils/checkSpeechRecognitionAvailable";

export interface ISubtitlesStore {
    audioOn: boolean;
    setAudioOn: (v: boolean) => void;
    subtitlesOn: boolean;
    setSubtitlesOn: (v: boolean) => void;
}

const useSubtitlesStore = create<ISubtitlesStore>()(
    devtools(
        immer((set, get) => ({
            audioOn: true,
            setAudioOn: (v: boolean) => {
                set({ audioOn: v });
            },
            subtitlesOn: checkSpeechRecognitionAvailable() ?? true,
            setSubtitlesOn: (v: boolean) => {
                set({ subtitlesOn: v });
            }
        }))
    )
);

export default useSubtitlesStore;
