import { Button, Input } from "ui";
import { Camera, Microphone, UserAdd, CameraOff, MicrophoneOff } from "assets/svgComponents";
import { ChangeEvent, lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";
import { SocketContext } from "context/SocketContext";
import useAuthStore from "store/authStore";
import { switchMediaEntity } from "./utils";

const CopyModal = lazy(() => import("./modals/CopyModal"));
const CallModal = lazy(() => import("./modals/CallModal"));

const HandleBar = () => {
    const userData = useAuthStore((state) => state.user);

    const { meetId, stream, call, callUser, callAccepted, callEnded, leaveCall, acceptCall } =
        useContext(SocketContext);

    const activeCallFlag = callAccepted && !callEnded;

    const [copyModalOpened, setCopyModalOpened] = useState(false);
    const [callModalOpened, setCallModalOpened] = useState(false);

    const [meetingId, setMeetingId] = useState("");

    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);

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

    const handleSwitchVideo = useCallback(() => {
        switchMediaEntity("video", stream, video, setVideo);
    }, [switchMediaEntity, stream, video, setVideo]);

    const handleSwitchAudio = useCallback(() => {
        switchMediaEntity("audio", stream, audio, setAudio);
    }, [switchMediaEntity, stream, audio, setAudio]);

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <div className={"flex flex-row gap-[10px] w-fit"}>
                    <Button onClick={handleSwitchVideo} title={"Камера"} className={"!py-1 !px-2"}>
                        {video ? <Camera /> : <CameraOff />}
                    </Button>
                    <Button
                        onClick={handleSwitchAudio}
                        title={"Микрофон"}
                        className={"!py-1 !px-2"}
                    >
                        {audio ? <Microphone /> : <MicrophoneOff />}
                    </Button>
                </div>
                <div className={"flex flex-row gap-[10px] w-fit"}>
                    <Button
                        onClick={() => setCopyModalOpened(true)}
                        className={"!py-1 !px-2"}
                        title={"Начать встречу"}
                    >
                        <UserAdd />
                    </Button>
                    <Input
                        disabled={activeCallFlag}
                        onChange={handleSetMeetingId}
                        placeholder={"Введите код встречи"}
                        className={"!max-w-[300px]"}
                    />
                    {activeCallFlag ? (
                        <Button onClick={leaveCall}>Сбросить</Button>
                    ) : (
                        <Button onClick={handleCallUser}>Присоединиться</Button>
                    )}
                </div>
            </div>
            {callModalOpened && (
                <Suspense>
                    <CallModal
                        onAcceptCall={acceptCall}
                        onLeaveCall={leaveCall}
                        callerName={call.name}
                        setIsVisible={setCallModalOpened}
                    />
                </Suspense>
            )}
            {copyModalOpened && (
                <Suspense>
                    <CopyModal meetId={meetId} setIsVisible={setCopyModalOpened} />
                </Suspense>
            )}
        </>
    );
};
export default HandleBar;
