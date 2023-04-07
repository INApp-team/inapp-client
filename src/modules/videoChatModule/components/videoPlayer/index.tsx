import { FC, useContext } from "react";
import { SocketContext } from "context/SocketContext";
import { borderGray600 } from "constants/styles/borders";
import { bgGray700 } from "constants/styles/backgrounds";

const VideoPlayer: FC = () => {
    const { myVideo, userVideo, stream, callAccepted, callEnded } = useContext(SocketContext);

    console.log(callAccepted && !callEnded, userVideo);

    return (
        <div
            className={`flex flex-col overflow-y-auto h-[calc(100%-50px)] border-[1px] p-[20px] mb-[10px] rounded ${borderGray600} ${bgGray700} `}
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
