import { SignalData } from "simple-peer";

export type TCall = {
    isReceivingCall: boolean;
    from: any;
    name: string;
    signal: SignalData;
};
