import { FC, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { SocketContext } from "context/SocketContext";
import { borderGray600, borderGray700 } from "constants/styles/borders";
import { bgGray300, bgGray700 } from "constants/styles/backgrounds";
import { useSubtitlesStore, useLangStore } from "store";
import { detectLanguage, translateLanguage } from "http/requests/languages";
import useAsyncEffect from "hooks/useAsyncEffect";

const VideoPlayer: FC = () => {
    const { myVideo, userVideo, stream, callAccepted, callEnded, onSubtitle, sendSubtitle } =
        useContext(SocketContext);
    const userVideoFlag = callAccepted && !callEnded;

    const { subtitlesOn, audioOn } = useSubtitlesStore((state) => state);
    const currentLang = useLangStore((state) => state.currentLang);

    const [currentSubtitle, setCurrentSubtitle] = useState("");

    useEffect(() => {
        onSubtitle(setCurrentSubtitle);
    }, []);

    useAsyncEffect(async () => {
        if (subtitlesOn && currentSubtitle) {
            const { data: detectedLanguage } = await detectLanguage(currentSubtitle);
            if (detectedLanguage !== currentLang) {
                const { data: translatedSubtitle } = await translateLanguage(
                    currentSubtitle,
                    currentLang
                );
                setCurrentSubtitle(translatedSubtitle);
            }
        }
    }, [subtitlesOn, currentSubtitle, currentLang]);

    useEffect(() => {
        const listened = audioOn && userVideoFlag;

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;

        const resultListener = async (e: SpeechRecognitionEvent) => {
            const resultArr = e.results || [];
            sendSubtitle(resultArr[resultArr.length - 1]?.[0]?.transcript);
        };

        if (listened) {
            recognition.addEventListener("result", resultListener);
            recognition.start();
        } else {
            recognition.removeEventListener("result", resultListener);
            recognition.stop();
        }

        return () => recognition.removeEventListener("result", resultListener);
    }, [userVideoFlag, audioOn]);

    return (
        <div
            className={classNames(
                "flex-1 flex flex-col justify-center items-center overflow-y-auto border-[1px] p-[20px] mb-[10px] rounded",
                borderGray600,
                bgGray700
            )}
        >
            <div className={"relative h-full w-fit"}>
                {userVideoFlag && (
                    <div className={"relative h-full w-full"}>
                        <video className={"w-full h-full"} playsInline ref={userVideo} autoPlay />
                        {subtitlesOn && currentSubtitle && (
                            <div
                                className={classNames(
                                    "z-20 absolute left-[50%] translate-x-[-50%] bottom-[40px] w-fit max-w-[400px] px-[16px] py-[8px] text-center rounded",
                                    bgGray300
                                )}
                            >
                                <span>{currentSubtitle}</span>
                            </div>
                        )}
                    </div>
                )}
                {stream && (
                    <div
                        className={
                            userVideoFlag
                                ? classNames(
                                      "absolute border-t-4 border-r-4 w-[200px] bottom-0 left-0",
                                      borderGray700
                                  )
                                : "h-full w-full"
                        }
                    >
                        <video
                            className={"h-full w-full"}
                            playsInline
                            muted
                            ref={myVideo}
                            autoPlay={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default VideoPlayer;
