import { IMsg } from "typization/interfaces";
import { TCall } from "typization/types";

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
    acceptCall: () => void;
    callUser: (id: string, userName: string) => void;
    leaveCall: () => void;
}

export const defaultSocketContextValues: ISocketContext = {
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
    acceptCall: () => {},
    callUser: () => {},
    leaveCall: () => {}
};
