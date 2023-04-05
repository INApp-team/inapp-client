import { FC } from "react";
import { EXTRA_MAIN_BG } from "constants/styles/backgrounds";
import ClickAwayListener from "react-click-away-listener";
import { Button, Input } from "ui";
import Copy from "assets/svgComponents/Copy";
import Close from "assets/svgComponents/Close";

import { CopyToClipboard } from "react-copy-to-clipboard";

interface IMeetingModal {
    setIsVisible: (v: boolean) => void;
    meetId: string;
}

const MeetingModal: FC<IMeetingModal> = ({ meetId, setIsVisible }) => {
    const closeModal = () => {
        setIsVisible(false);
    };

    return (
        <ClickAwayListener onClickAway={closeModal}>
            <div
                className={`flex flex-col justify-between p-[20px] absolute h-[230px] w-[360px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded ${EXTRA_MAIN_BG} shadow-custom`}
            >
                <div className={`flex justify-between`}>
                    <h2 className={`text-gray-300`}>Код вашей встречи</h2>
                    <span onClick={closeModal} className={"cursor-pointer"}>
                        <Close size={"24px"} />
                    </span>
                </div>
                <p className={`text-gray-400`}>
                    Скопируйте эту ссылку и поделитесь с теми, кого хотите пригласить. Сохраните ее,
                    если планируете встречу позже.
                </p>
                <div className={`flex gap-[10px]`}>
                    <Input value={meetId} disabled />
                    <CopyToClipboard text={meetId}>
                        <Button>
                            <Copy size={"32px"} />
                        </Button>
                    </CopyToClipboard>
                </div>
            </div>
        </ClickAwayListener>
    );
};
export default MeetingModal;
