import { FC, useContext } from "react";
import { SocketContext } from "context/SocketContext";
import { DEFAULT_BORDER } from "constants/styles/borders";
import { EXTRA_MAIN_BG } from "constants/styles/backgrounds";

const VideoPlayer: FC = () => {
    const { myVideo, userVideo, stream, callAccepted, callEnded } = useContext(SocketContext);

    console.log(callAccepted && !callEnded, userVideo);

    return (
        <div
            className={`flex flex-col overflow-y-auto h-[calc(100%-50px)] border-[1px] p-[20px] mb-[10px] rounded ${DEFAULT_BORDER} ${EXTRA_MAIN_BG} `}
        >
            <div>
                {stream && (
                    <div>
                        <video playsInline muted ref={myVideo} autoPlay={true} />
                    </div>
                )}
                {callAccepted && !callEnded && (
                    <div>
                        <video playsInline ref={userVideo} autoPlay />
                    </div>
                )}
            </div>
        </div>
    );
};
export default VideoPlayer;
