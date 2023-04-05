import VideoPlayer from "./components/videoPlayer";
import HandleBar from "./components/handleBar";

const VideoChatModule = () => {
    return (
        <div className={"h-full w-[65%] p-[10px]"}>
            <VideoPlayer />
            <HandleBar />
        </div>
    );
};
export default VideoChatModule;
