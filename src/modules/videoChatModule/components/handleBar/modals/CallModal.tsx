import { FC, memo, useCallback } from "react";
import { bgGray700, bgGreen500, bgRed500 } from "constants/styles/backgrounds";
import { gray300 } from "constants/styles/colors";
import { Button } from "ui";
import { Call, EndCall } from "assets/svgComponents";

interface ICallModal {
    onAcceptCall: () => void;
    onLeaveCall: () => void;
    callerName: string;
    setIsVisible: (v: boolean) => void;
}
const CallModal: FC<ICallModal> = ({ onAcceptCall, onLeaveCall, callerName, setIsVisible }) => {
    const handleAcceptCall = useCallback(() => {
        onAcceptCall();
        setIsVisible(false);
    }, [onAcceptCall, setIsVisible]);

    const handleLeaveCall = useCallback(() => {
        onLeaveCall();
        setIsVisible(false);
    }, [onLeaveCall, setIsVisible]);

    // @ts-ignore
    return (
        <div className={`z-10 fixed h-screen w-screen top-0 left-0`}>
            <div
                className={`z-11 flex flex-col text-center gap-[20px] p-[20px] absolute w-[300px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded ${bgGray700} shadow-custom`}
            >
                <p className={`${gray300} text-xl`}>
                    Вам звонит: {callerName || '"Неопознанный абонент"'}
                </p>
                <div className={`flex align-middle justify-around`}>
                    <Button
                        backgroundColor={bgGreen500}
                        hover={"hover:bg-green-400"}
                        onClick={handleAcceptCall}
                    >
                        <Call />
                    </Button>
                    <Button
                        backgroundColor={bgRed500}
                        hover={"hover:bg-red-400"}
                        onClick={handleLeaveCall}
                    >
                        <EndCall />
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default memo(CallModal);
