import { FC, useContext } from "react";
import classNames from "classnames";
import { SocketContext } from "context/SocketContext";
import { borderGray600, borderGray700 } from "constants/styles/borders";
import { bgGray700 } from "constants/styles/backgrounds";

const VideoPlayer: FC = () => {
    const { myVideo, userVideo, stream, callAccepted, callEnded } = useContext(SocketContext);

    const displayUserVideoFlag = callAccepted && !callEnded;

    return (
        <div
            className={classNames(
                "flex flex-col justify-center items-center overflow-y-auto h-[calc(100%-50px)] border-[1px] p-[20px] mb-[10px] rounded",
                borderGray600,
                bgGray700
            )}
        >
            <div className={"relative h-full w-fit"}>
                {displayUserVideoFlag && (
                    <div
                        className={classNames(
                            "absolute border-t-4 border-r-4 w-[200px] bottom-0 left-0",
                            borderGray700
                        )}
                    >
                        <video className={"w-full h-full"} playsInline ref={userVideo} autoPlay />
                    </div>
                )}
                {stream && (
                    <video
                        className={"h-full w-full"}
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay={true}
                    />
                )}
            </div>
        </div>
    );
};
export default VideoPlayer;
