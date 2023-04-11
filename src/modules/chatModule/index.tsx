import {
    MouseEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useState,
    useContext,
    useRef,
    ChangeEvent
} from "react";
import { Button, Input } from "ui";
import { borderGray600 } from "constants/styles/borders";
import { IMsg } from "interfaces";
import { bgGray700 } from "constants/styles/backgrounds";
import { useLangStore, useAuthStore } from "store";
import { translateLanguage, detectLanguage } from "http/requests/languages";
import useAsyncEffect from "hooks/useAsyncEffect";
import { SocketContext } from "context/SocketContext";
import { CHAT_MESSAGES } from "constants/localSt";
import classNames from "classnames";
import Message from "./Message";

const ChatModule = () => {
    const { joinChat, onChatMessage, sendChatMessage } = useContext(SocketContext);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { user } = useAuthStore((state) => state);
    const { currentLang } = useLangStore((state) => state);

    const [inputValue, setInputValue] = useState("");
    const [allMessages, setAllMessages] = useState<IMsg[]>(
        JSON.parse(localStorage.getItem(CHAT_MESSAGES) || "null") || []
    );
    const [currentMessage, setCurrentMessage] = useState<IMsg>();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            block: "start"
        });
    }, [allMessages]);

    useEffect(() => {
        joinChat(user.login);
        onChatMessage(setCurrentMessage);
    }, []);

    useAsyncEffect(async () => {
        if (currentMessage) {
            const currentTextMessage = currentMessage.message;
            const { data: detectedLanguage } = await detectLanguage(currentTextMessage);
            if (detectedLanguage === currentLang) {
                setAllMessages((prevMessages) => {
                    const messages = [...prevMessages, currentMessage];
                    localStorage.setItem(CHAT_MESSAGES, JSON.stringify(messages));
                    return messages;
                });
            } else {
                const { data: translatedMessage } = await translateLanguage(
                    currentMessage.message,
                    currentLang
                );
                setAllMessages((prevMessages) => {
                    const messages = [
                        ...prevMessages,
                        { user: currentMessage.user, message: translatedMessage }
                    ];
                    localStorage.setItem(CHAT_MESSAGES, JSON.stringify(messages));
                    return messages;
                });
            }
        }
    }, [currentMessage]);

    const handleSendMessage = useCallback(
        (e?: MouseEvent<HTMLElement>) => {
            if (e) {
                e.preventDefault();
            }

            if (!inputValue) return;

            setCurrentMessage({ user: user.login, message: inputValue });
            sendChatMessage(inputValue, user.login);
            setInputValue("");
        },
        [sendChatMessage, inputValue, user]
    );

    const handleEnterClick = useCallback(
        (e: KeyboardEvent<HTMLElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
            }
        },
        [handleSendMessage]
    );

    const handleMessageInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    return (
        <div className={"flex flex-col h-full w-[35%] p-[10px]"}>
            <div
                className={classNames(
                    "flex-1 flex flex-col overflow-y-auto mb-[10px] border-[1px] p-[20px] rounded break-all",
                    borderGray600,
                    bgGray700
                )}
            >
                {allMessages.map((m, index) => (
                    <Message key={index} msg={m} userLogin={user.login} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={"flex justify-around items-center gap-[10px]"}>
                <Input
                    value={inputValue}
                    onChange={handleMessageInput}
                    onKeyDown={handleEnterClick}
                    placeholder={"Пишите, чем хотите поделиться!"}
                />
                <Button onClick={handleSendMessage}>Отправить</Button>
            </div>
        </div>
    );
};
export default ChatModule;
