import { createContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import * as io from "socket.io-client";
import { ICall, IMsg } from "interfaces";
import { SOCKET_URL } from "http/urls";
import { defaultSocketContextValues } from "./defaultSocketContextValues";
import { SOCKET_ACTIONS } from "constants/socketActions";
import useAuthStore from "../store/authStore";

const socket = io.connect(SOCKET_URL);

export const SocketContext = createContext(defaultSocketContextValues);

type TContextProvider = {
    children: any;
};

const ContextProvider = ({ children }: TContextProvider) => {
    const isAuth = useAuthStore((state) => state.isAuth);

    const [stream, setStream] = useState<MediaStream | undefined>();
    const [userStream, setUserStream] = useState<MediaStream | undefined>();
    const [meetId, setMeetId] = useState("");
    const [call, setCall] = useState<ICall>({} as ICall);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    const myVideo = useRef<HTMLMediaElement | undefined>();
    const userVideo = useRef<HTMLMediaElement | undefined>();
    const connectionRef = useRef<Peer.Instance>();

    const joinChat = (userName: string) => socket.emit("joinChat", { userName });
    const onChatMessage = (setter: (d: IMsg) => void) =>
        socket.on(SOCKET_ACTIONS.CHAT_MESSAGE, (data: IMsg) => setter(data));
    const sendChatMessage = (message: string, userName: string) =>
        socket.emit(SOCKET_ACTIONS.SEND_CHAT_MESSAGE, {
            message,
            userName
        });

    const onCallSent = (cb: (ms: string) => void) =>
        socket.on(SOCKET_ACTIONS.CALL_SENT, (info) => cb(info));

    const onSubtitle = (cb: (s: string) => void) => {
        socket.on(SOCKET_ACTIONS.SUBTITLE, (data: string) => cb(data));
    };

    const sendSubtitle = (subtitle: string) => {
        socket.emit(SOCKET_ACTIONS.SUBTITLE_SENT, subtitle);
    };

    useEffect(() => {
        //my video obtained current stream
        const _myVideo = myVideo.current;
        if (_myVideo && stream) {
            _myVideo.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        const _userVideo = userVideo.current;
        if (_userVideo && userStream) {
            _userVideo.srcObject = userStream;
        }
    }, [userStream]);

    useEffect(() => {
        //permission to use video and audio
        if (navigator.mediaDevices && isAuth) {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true
                })
                .then((currentStream) => {
                    setStream(currentStream);
                });
        }
    }, [isAuth]);

    useEffect(() => {
        //get socket id when connection opened
        socket.on(SOCKET_ACTIONS.SOCKET_ID, (id) => setMeetId(id));

        socket.on(SOCKET_ACTIONS.CALL_ENDED, () => {
            if (connectionRef.current) {
                leaveCall();
            }
        });

        //get call data from server to create a call
        socket.on(SOCKET_ACTIONS.CALL_USER, ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const acceptCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit(SOCKET_ACTIONS.ANSWER_CALL, { signal: data, to: call.from });
        });

        //stream other user video
        peer.on("stream", (currentStream) => {
            setUserStream(currentStream);
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id: string, userName: string) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit(SOCKET_ACTIONS.CALL_USER, {
                userToCall: id,
                signalData: data,
                from: meetId,
                name: userName
            });
        });

        peer.on("stream", (currentStream) => {
            setUserStream(currentStream);
        });

        socket.on(SOCKET_ACTIONS.CALL_ACCEPTED, (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        const peerConnection = connectionRef.current;

        if (peerConnection) {
            peerConnection.destroy();
        }

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                joinChat,
                onChatMessage,
                sendChatMessage,
                onCallSent,
                onSubtitle,
                sendSubtitle,
                call,
                callAccepted,
                callEnded,
                myVideo,
                userVideo,
                stream,
                meetId,
                acceptCall,
                callUser,
                leaveCall
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default ContextProvider;
