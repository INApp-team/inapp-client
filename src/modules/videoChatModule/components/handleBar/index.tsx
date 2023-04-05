import { Button, Input } from "ui";
import { Camera, Microphone, UserAdd } from "assets/svgComponents";
import MeetingModal from "./modal";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { SocketContext } from "context/SocketContext";
import useAuthStore from "store/authStore";

const HandleBar = () => {
    const userData = useAuthStore((state) => state.user);

    const { meetId, stream, call, callUser, callAccepted, callEnded, leaveCall, answerCall } =
        useContext(SocketContext);

    const [modalOpened, setModalOpened] = useState(false);
    const [meetingId, setMeetingId] = useState("");

    const activeCallFlag = callAccepted && !callEnded;

    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);

    const handleSetMeetingId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMeetingId(e.target.value);
    }, []);

    const handleCallUser = useCallback(() => {
        if (meetingId) {
            callUser(meetingId, userData.login);
        }
    }, [callUser, meetingId, userData]);

    const switchOffVideo = () => {
        if (stream) {
            if (video) {
                setVideo(false);
                stream.getTracks().forEach(function (track) {
                    if (track.readyState === "live" && track.kind === "video") {
                        track.enabled = false;
                    }
                });
            } else {
                setVideo(true);
                console.log("enable");
                stream.getTracks().forEach(function (track) {
                    if (track.readyState === "live" && track.kind === "video") {
                        track.enabled = true;
                    }
                });
            }
        }
    };

    const switchOffAudio = () => {
        if (stream) {
            if (audio) {
                setAudio(false);
                stream.getTracks().forEach(function (track) {
                    if (track.readyState === "live" && track.kind === "audio") {
                        track.enabled = false;
                    }
                });
            } else {
                setAudio(true);
                stream.getTracks().forEach(function (track) {
                    if (track.readyState === "live" && track.kind === "audio") {
                        track.enabled = true;
                    }
                });
            }
        }
    };

    return (
        <div className="flex flex-row justify-between items-center">
            <div className={"flex flex-row gap-[10px] w-fit"}>
                <Button onClick={switchOffVideo} title={"Камера"} className={"!py-1 !px-2"}>
                    <Camera size="32px" />
                </Button>
                <Button onClick={switchOffAudio} title={"Микрофон"} className={"!py-1 !px-2"}>
                    <Microphone size="32px" />
                </Button>
            </div>
            <div className={"flex flex-row gap-[10px] w-fit"}>
                <Button
                    onClick={() => setModalOpened(true)}
                    className={"!py-1 !px-2"}
                    title={"Начать встречу"}
                >
                    <UserAdd size={"32px"} />
                </Button>
                <Input
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
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <h1>{call.name} is calling:</h1>
                    <Button onClick={answerCall}>Answer</Button>
                </div>
            )}
            {modalOpened && <MeetingModal meetId={meetId} setIsVisible={setModalOpened} />}
        </div>
    );
};
export default HandleBar;
