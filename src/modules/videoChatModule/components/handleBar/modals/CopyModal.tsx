import { FC, lazy, memo, useCallback } from "react";
import { bgGray700 } from "constants/styles/backgrounds";
import ClickAwayListener from "react-click-away-listener";
import { Button, Input } from "ui";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { gray300, gray400 } from "constants/styles/colors";
import { Copy, Close } from "assets/svgComponents";
import { openPopup } from "ui/popup";

const Popup = lazy(() => import("ui/popup"));

interface IMeetingModal {
    setIsVisible: (v: boolean) => void;
    meetId: string;
}

const MeetingModal: FC<IMeetingModal> = ({ meetId, setIsVisible }) => {
    const closeModal = () => {
        setIsVisible(false);
    };

    const handleCopyBtnClick = useCallback(() => openPopup("Код встречи скопирован."), []);

    return (
        <>
            <ClickAwayListener onClickAway={closeModal}>
                <div
                    className={`z-10 flex flex-col justify-between p-[20px] absolute h-[230px] w-[360px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded ${bgGray700} shadow-custom`}
                >
                    <div className={`flex justify-between`}>
                        <p className={`${gray300} text-xl`}>Код вашей встречи</p>
                        <span onClick={closeModal} className={"cursor-pointer"}>
                            <Close size={"24px"} />
                        </span>
                    </div>
                    <p className={`${gray400}`}>
                        Скопируйте эту ссылку и поделитесь с теми, кого хотите пригласить. Сохраните
                        ее, если планируете встречу позже.
                    </p>
                    <div className={`flex gap-[10px]`}>
                        <Input value={meetId} disabled />
                        <CopyToClipboard text={meetId}>
                            <Button onClick={handleCopyBtnClick}>
                                <Copy />
                            </Button>
                        </CopyToClipboard>
                    </div>
                </div>
            </ClickAwayListener>
            <Popup />
        </>
    );
};
export default memo(MeetingModal);
