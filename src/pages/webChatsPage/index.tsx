import { FC } from "react";
import VideoChatModule from "modules/videoChatModule";
import ChatModule from "modules/chatModule";

const WebChatsPage: FC = () => {
    return (
        //calc 100%-header height-footer height
        <div
            className={`h-[calc(100%-72px-40px)] w-full flex justify-around items-center gap-[10px]`}
        >
            <VideoChatModule />
            <ChatModule />
        </div>
    );
};
export default WebChatsPage;
