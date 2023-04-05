import { createContext, useEffect, useRef, useState } from "react";
import Peer, { SignalData } from "simple-peer";
import * as io from "socket.io-client";
import { IMsg } from "interfaces";
import { SOCKET_URL } from "http/urls";

const socket = io.connect(SOCKET_URL);

type TCall = {
    isReceivingCall: boolean;
    from: any;
    name: string;
    signal: SignalData;
};

type TContextProvider = {
    children: any;
};

interface ISocketContext {
    joinChat: (userName: string) => void;
    onChatMessage: (setter: (d: IMsg) => void) => void;
    sendChatMessage: (message: string, userName: string) => void;
    call: TCall;
    callAccepted: boolean;
    callEnded: boolean;
    myVideo: any;
    userVideo: any;
    stream: MediaStream | undefined;
    meetId: string;
    answerCall: () => void;
    callUser: (id: string, userName: string) => void;
    leaveCall: () => void;
}

const defaultSocketContextValues: ISocketContext = {
    joinChat: () => {},
    onChatMessage: () => {},
    sendChatMessage: () => {},
    call: {} as TCall,
    callAccepted: false,
    callEnded: false,
    myVideo: undefined,
    userVideo: undefined,
    stream: undefined,
    meetId: "",
    answerCall: () => {},
    callUser: () => {},
    leaveCall: () => {}
};

export const SocketContext = createContext<ISocketContext>(defaultSocketContextValues);

const ContextProvider = ({ children }: TContextProvider) => {
    const [stream, setStream] = useState<MediaStream | undefined>();
    const [userStream, setUserStream] = useState<MediaStream | undefined>();
    const [meetId, setMeetId] = useState("");
    const [call, setCall] = useState<TCall>({} as TCall);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    const myVideo = useRef<HTMLMediaElement | undefined>();
    const userVideo = useRef<HTMLMediaElement | undefined>();
    const connectionRef = useRef<HTMLMediaElement | undefined>();

    const joinChat = (userName: string) => socket.emit("joinChat", { userName });
    const onChatMessage = (setter: (d: IMsg) => void) =>
        socket.on("chatMessage", (data: IMsg) => setter(data));
    const sendChatMessage = (message: string, userName: string) =>
        socket.emit("sendChatMessage", {
            message,
            userName
        });

    useEffect(() => {
        //my video obtained current stream
        const _myVideo = myVideo.current;
        if (_myVideo && stream) {
            _myVideo.srcObject = stream;
            console.log("myVideo", myVideo);
        }
    }, [stream]);

    useEffect(() => {
        const _userVideo = userVideo.current;
        if (_userVideo && userStream) {
            console.log("userVideo", userVideo);
            _userVideo.srcObject = userStream;
            console.log("userVideo", userVideo);
        }
    }, [userStream]);

    useEffect(() => {
        //permission to use video and audio
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true
                })
                .then((currentStream) => {
                    setStream(currentStream);
                });
        }

        //get socket id when connection opened
        socket.on("socketId", (id) => setMeetId(id));

        //get call data from server to create a call
        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        //stream other user video
        peer.on("stream", (currentStream) => {
            setUserStream(currentStream);
        });

        peer.signal(call.signal);

        connectionRef.current = peer as Peer.Instance & HTMLMediaElement;
    };

    const callUser = (id: string, userName: string) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: meetId,
                name: userName
            });
        });

        peer.on("stream", (currentStream) => {
            setUserStream(currentStream);
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer as Peer.Instance & HTMLMediaElement;
    };

    const leaveCall = () => {
        setCallEnded(true);

        (connectionRef.current as any).destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                joinChat,
                onChatMessage,
                sendChatMessage,
                call,
                callAccepted,
                callEnded,
                myVideo,
                userVideo,
                stream,
                meetId,
                answerCall,
                callUser,
                leaveCall
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default ContextProvider;
