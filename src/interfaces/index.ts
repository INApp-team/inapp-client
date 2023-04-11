import { SignalData } from "simple-peer";

export interface IUser {
    login: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IMsg {
    user: string;
    message: string;
}

export interface ICall {
    isReceivingCall: boolean;
    from: any;
    name: string;
    signal: SignalData;
}
