import { FC } from "react";
import VideoChatModule from "modules/videoChatModule";
import ChatModule from "modules/chatModule";

const WebChatsPage: FC = () => {
    return (
        <main
            className={
                "h-full w-full flex justify-around items-center gap-[10px] pb-[theme(layout.footerHeight)] pt-[theme(layout.headerHeight)]"
            }
        >
            <VideoChatModule />
            <ChatModule />
        </main>
    );
};
export default WebChatsPage;
