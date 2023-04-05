import { FC, useCallback, useState } from "react";
import { MAIN_BG, LIGHT_BG } from "constants/styles/backgrounds";
import { Input, Button, ExtraText } from "ui";
import Label from "./Label";
import useAuthStore from "store/authStore";

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

    return (
        <div className={`h-screen w-screen ${MAIN_BG} flex justify-center items-center`}>
            <form className={`w-[400px] ${LIGHT_BG} shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
                <div className="mb-4">
                    <Label htmlFor={"login"} text={"Имя пользователя"} />
                    <Input
                        value={loginValue}
                        onChange={(e) => setLoginValue(e.target.value)}
                        id={"login"}
                        type={"text"}
                        placeholder={"Логин"}
                        className="mb-3"
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor={"password"} text={"Пароль"} />
                    <Input
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        id={"password"}
                        type={"password"}
                        placeholder="******************"
                        className="mb-3"
                    />
                    {currentErrMsg && <ExtraText text={currentErrMsg} />}
                </div>
                <div className="flex items-center justify-between">
                    <Button onClick={onLoginClick}>Войти</Button>
                    <Button onClick={onRegistrationClick}>Регистрация</Button>
                </div>
            </form>
        </div>
    );
};
export default LoginModule;
