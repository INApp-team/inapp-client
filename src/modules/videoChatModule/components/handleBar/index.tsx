import { Button, Input } from "ui";
import {
    Camera,
    CameraOff,
    Microphone,
    MicrophoneOff,
    UserAdd,
    Subtitles
} from "assets/svgComponents";
import { ChangeEvent, lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";
import { SocketContext } from "context/SocketContext";
import { useAuthStore, useSubtitlesStore } from "store";
import { switchMediaEntity } from "./utils";
import { AUDIO, VIDEO } from "./constants";
import { bgGreen300, bgGreen400, bgRed300, bgRed400 } from "constants/styles/backgrounds";
import { openPopup } from "ui/popup";
import checkSpeechRecognitionAvailable from "utils/checkSpeechRecognitionAvailable";

const Popup = lazy(() => import("ui/popup"));
const CopyModal = lazy(() => import("./modals/CopyModal"));
const CallModal = lazy(() => import("./modals/CallModal"));

const HandleBar = () => {
    const userData = useAuthStore((state) => state.user);
    const { audioOn, setAudioOn, subtitlesOn, setSubtitlesOn } = useSubtitlesStore(
        (state) => state
    );

    const speechRecognitionAvailable = checkSpeechRecognitionAvailable();

    const {
        meetId,
        stream,
        call,
        callUser,
        callAccepted,
        callEnded,
        leaveCall,
        acceptCall,
        onCallSent
    } = useContext(SocketContext);

    const activeCallFlag = callAccepted && !callEnded;

    const [copyModalOpened, setCopyModalOpened] = useState(false);
    const [callModalOpened, setCallModalOpened] = useState(false);

    const [meetingId, setMeetingId] = useState("");

    const [video, setVideo] = useState(true);

    useEffect(() => {
        onCallSent(openPopup);
    }, []);

    useEffect(() => {
        setCallModalOpened(call.isReceivingCall && !callAccepted);
    }, [call, callAccepted]);

    const handleSetMeetingId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMeetingId(e.target.value);
    }, []);

    const handleCallUser = useCallback(() => {
        if (meetingId) {
            callUser(meetingId, userData.login);
        }
    }, [callUser, meetingId, userData]);

    const handleOpenCopyModal = useCallback(() => setCopyModalOpened(true), []);

    const handleSwitchVideo = useCallback(() => {
        switchMediaEntity(VIDEO, stream, video, setVideo);
    }, [stream, video, setVideo]);

    const handleSwitchAudio = useCallback(() => {
        switchMediaEntity(AUDIO, stream, audioOn, setAudioOn);
    }, [stream, audioOn, setAudioOn]);

    const handleSwitchSubtitles = useCallback(() => {
        setSubtitlesOn(!subtitlesOn);
    }, [subtitlesOn]);

    const getSwitchesBtnsStyles = useCallback(
        (entity: boolean) => ({
            backgroundColor: entity ? bgGreen400 : bgRed400,
            className: "!py-1 !px-2",
            hover: entity ? ["hover:", bgGreen300].join("") : ["hover:", bgRed300].join("")
        }),
        []
    );

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <div className={"flex flex-row gap-[10px] w-fit"}>
                    <Button
                        onClick={handleSwitchVideo}
                        title={"Камера"}
                        {...getSwitchesBtnsStyles(video)}
                    >
                        {video ? <Camera /> : <CameraOff />}
                    </Button>
                    <Button
                        onClick={handleSwitchAudio}
                        title={"Микрофон"}
                        {...getSwitchesBtnsStyles(audioOn)}
                    >
                        {audioOn ? <Microphone /> : <MicrophoneOff />}
                    </Button>
                    <Button
                        disabled={!speechRecognitionAvailable}
                        onClick={handleSwitchSubtitles}
                        title={
                            speechRecognitionAvailable
                                ? "Субтитры"
                                : "Данный браузер не поддерживает субтитры"
                        }
                        {...getSwitchesBtnsStyles(subtitlesOn)}
                    >
                        <Subtitles />
                    </Button>
                </div>
                <div className={"flex flex-row gap-[10px] w-fit"}>
                    <Button
                        onClick={handleOpenCopyModal}
                        className={"!py-1 !px-2"}
                        title={"Начать встречу"}
                    >
                        <UserAdd />
                    </Button>
                    <Input
                        disabled={activeCallFlag}
                        onChange={handleSetMeetingId}
                        placeholder={"Введите код встречи"}
                        className={"!w-[260px]"}
                    />
                    {activeCallFlag ? (
                        <Button onClick={leaveCall}>Сбросить</Button>
                    ) : (
                        <Button onClick={handleCallUser}>Присоединиться</Button>
                    )}
                </div>
            </div>
            <Suspense>
                {callModalOpened && (
                    <CallModal
                        onAcceptCall={acceptCall}
                        onLeaveCall={leaveCall}
                        callerName={call.name}
                        setIsVisible={setCallModalOpened}
                    />
                )}
                {copyModalOpened && <CopyModal meetId={meetId} setIsVisible={setCopyModalOpened} />}
                <Popup />
            </Suspense>
        </>
    );
};
export default HandleBar;
