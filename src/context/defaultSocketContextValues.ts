import { IMsg, ICall } from "interfaces";

interface ISocketContext {
    joinChat: (userName: string) => void;
    onChatMessage: (setter: (d: IMsg) => void) => void;
    sendChatMessage: (message: string, userName: string) => void;
    onCallSent: (cb: (ms: string) => void) => void;
    call: ICall;
    callAccepted: boolean;
    callEnded: boolean;
    myVideo: any;
    userVideo: any;
    stream: MediaStream | undefined;
    meetId: string;
    acceptCall: () => void;
    callUser: (id: string, userName: string) => void;
    leaveCall: () => void;
}

export const defaultSocketContextValues: ISocketContext = {
    joinChat: () => {},
    onChatMessage: () => {},
    sendChatMessage: () => {},
    onCallSent: () => {},
    call: {} as ICall,
    callAccepted: false,
    callEnded: false,
    myVideo: undefined,
    userVideo: undefined,
    stream: undefined,
    meetId: "",
    acceptCall: () => {},
    callUser: () => {},
    leaveCall: () => {}
};
