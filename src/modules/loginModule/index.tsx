import { ChangeEvent, FC, useCallback, useState } from "react";
import { bgGray800, bgGray400 } from "constants/styles/backgrounds";
import { Input, Button, ExtraText } from "ui";
import Label from "./Label";
import useAuthStore from "store/authStore";
import classNames from "classnames";

const LOGIN = "login";
const PASSWORD = "password";

const LoginModule: FC = () => {
    const { login, registration, authErrorStr } = useAuthStore((state) => state);

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const currentErrMsg = errMsg || authErrorStr;

    const onLoginClick = useCallback(async () => {
        if (!loginValue || !passwordValue) {
            setErrMsg("Введите логин/пароль!");
        } else {
            setErrMsg("");
            await login(loginValue, passwordValue);
        }
    }, [loginValue, passwordValue, login]);

    const onRegistrationClick = useCallback(async () => {
        if (!loginValue || !passwordValue) {
            setErrMsg("Введите логин/пароль!");
        } else {
            setErrMsg("");
            await registration(loginValue, passwordValue);
        }
    }, [loginValue, passwordValue, registration]);

    const handleChangeInputValue = useCallback(
        (type: typeof LOGIN | typeof PASSWORD) => (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            type === LOGIN ? setLoginValue(value) : setPasswordValue(value);
        },
        [setLoginValue, setPasswordValue]
    );

    return (
        <div
            className={classNames("h-screen w-screen flex justify-center items-center", bgGray800)}
        >
            <form
                className={classNames("w-[400px] shadow-md rounded px-8 pt-6 pb-8 mb-4", bgGray400)}
            >
                <div className={"mb-4"}>
                    <Label htmlFor={LOGIN} text={"Имя пользователя"} />
                    <Input
                        value={loginValue}
                        onChange={handleChangeInputValue(LOGIN)}
                        id={LOGIN}
                        type={"text"}
                        placeholder={"Логин"}
                        className={"mb-3"}
                    />
                </div>
                <div className={"mb-6"}>
                    <Label htmlFor={PASSWORD} text={"Пароль"} />
                    <Input
                        value={passwordValue}
                        onChange={handleChangeInputValue(PASSWORD)}
                        id={PASSWORD}
                        type={"password"}
                        placeholder="******************"
                        className={"mb-3"}
                    />
                    {currentErrMsg && <ExtraText text={currentErrMsg} />}
                </div>
                <div className={"flex items-center justify-between"}>
                    <Button onClick={onLoginClick}>Войти</Button>
                    <Button onClick={onRegistrationClick}>Регистрация</Button>
                </div>
            </form>
        </div>
    );
};
export default LoginModule;
