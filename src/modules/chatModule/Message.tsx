import { FC } from "react";
import { IMsg } from "interfaces";
import classNames from "classnames";
import { bgBlue600, bgGray700, bgGray800 } from "constants/styles/backgrounds";
import { gray400, green500, white } from "constants/styles/colors";

interface IMessage {
    msg: IMsg;
    userLogin: string;
}
const Message: FC<IMessage> = ({ msg, userLogin }) => {
    const mUser = msg.user;
    const isAdminFlag = mUser === "admin";

    const classStr = classNames(
        isAdminFlag
            ? ["flex flex-row items-center gap-2 mb-6", bgGray700].join(" ")
            : [
                  "flex flex-col rounded w-fit py-2 px-4 mb-6",
                  mUser === userLogin
                      ? ["self-end", bgGray800].join(" ")
                      : ["`self-start", bgBlue600].join(" ")
              ].join(" ")
    );
    return (
        <div className={classStr}>
            <p
                className={classNames(
                    isAdminFlag ? ["text-md", green500].join(" ") : ["text-xs", gray400].join(" ")
                )}
            >
                {mUser}:
            </p>
            <p className={white}>{msg.message}</p>
        </div>
    );
};
export default Message;
