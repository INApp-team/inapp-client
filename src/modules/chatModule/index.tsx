import {
    MouseEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useState,
    useContext,
    useRef
} from "react";
import useAuthStore from "store/authStore";
import { Button, Input } from "ui";
import { borderGray600 } from "constants/styles/borders";
import { IMsg } from "interfaces";
import { bgBlue600, bgGray800, bgGray700 } from "constants/styles/backgrounds";
import useLangStore from "store/langStore";
import { translateLanguage, detectLanguage } from "./utils/http";
import useAsyncEffect from "hooks/useAsyncEffect";
import { SocketContext } from "context/SocketContext";
import { gray400, green500, white } from "constants/styles/colors";
import { CHAT_MESSAGES } from "constants/localSt";
import classNames from "classnames";

const ChatModule = () => {
    const { joinChat, onChatMessage, sendChatMessage } = useContext(SocketContext);

    const chatContainer = useRef<HTMLDivElement | null>(null);

    const { user } = useAuthStore((state) => state);
    const { currentLang } = useLangStore((state) => state);

    const [inputValue, setInputValue] = useState("");
    const [allMsgs, setAllMsgs] = useState<IMsg[]>(
        JSON.parse(localStorage.getItem(CHAT_MESSAGES) || "null") || []
    );
    const [currentMsg, setCurrentMsg] = useState<IMsg>();

    useEffect(() => {
        if (chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        joinChat(user.login); //join
        onChatMessage(setCurrentMsg); //msg about joining will be added to array of messages
    }, []);

    useAsyncEffect(async () => {
        if (currentMsg) {
            const currentTextMessage = currentMsg.message;
            const { data: detectedLanguage } = await detectLanguage(currentTextMessage);
            if (detectedLanguage === currentLang) {
                setAllMsgs((prevMsgs) => {
                    const messages = [...prevMsgs, currentMsg];
                    localStorage.setItem(CHAT_MESSAGES, JSON.stringify(messages));
                    return messages;
                });
            } else {
                const { data: translatedMessage } = await translateLanguage(
                    currentMsg.message,
                    currentLang
                );
                setAllMsgs((prevMsgs) => {
                    const messages = [
                        ...prevMsgs,
                        { user: currentMsg.user, message: translatedMessage }
                    ];
                    localStorage.setItem(CHAT_MESSAGES, JSON.stringify(messages));
                    return messages;
                });
            }
        }
    }, [currentMsg]);

    const handleSendBtnClick = useCallback(
        (e?: MouseEvent<HTMLElement>) => {
            if (e) {
                e.preventDefault();
            }

            if (!inputValue) return;

            setCurrentMsg({ user: user.login, message: inputValue });

            sendChatMessage(inputValue, user.login);

            setInputValue("");
        },
        [sendChatMessage, inputValue]
    );

    const handleSendEnterClick = useCallback(
        (e: KeyboardEvent<HTMLElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSendBtnClick();
            }
        },
        [handleSendBtnClick]
    );

    return (
        <div className={"h-full w-[35%] p-[10px]"}>
            <div
                ref={chatContainer}
                className={classNames(
                    "flex flex-col overflow-y-auto h-[calc(100%-50px)] mb-[10px] border-[1px] p-[20px] rounded break-all",
                    borderGray600,
                    bgGray700
                )}
            >
                {allMsgs.map((m, index) => {
                    const mUser = m.user;
                    const isAdminFlag = mUser === "admin";
                    const wrapperClassName = isAdminFlag
                        ? `flex flex-row items-center gap-2 ${bgGray700} mb-6`
                        : `flex flex-col rounded w-fit py-2 px-4 mb-6 ${
                              mUser === user.login
                                  ? `self-end ${bgGray800}`
                                  : `self-start ${bgBlue600}`
                          }`;
                    return (
                        <div className={wrapperClassName} key={index}>
                            <p
                                className={`${
                                    isAdminFlag ? `text-md ${green500}` : `text-xs ${gray400}`
                                }`}
                            >
                                {mUser}:
                            </p>
                            <p className={`${white}`}>{m.message}</p>
                        </div>
                    );
                })}
            </div>
            <div className={"flex justify-around items-center gap-[10px]"}>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSendEnterClick}
                    placeholder={"Пишите, чем хотите поделиться!"}
                />
                <Button onClick={handleSendBtnClick}>Отправить</Button>
            </div>
        </div>
    );
};
export default ChatModule;
