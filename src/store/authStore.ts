import { IAuthResponse, IUser } from "interfaces";
import axios from "axios";
import $api from "../http";
import { API_URL } from "http/urls";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export interface IUseAuthStore {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    authErrorStr: string;
    login: (login: string, password: string) => void;
    registration: (login: string, password: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

const useAuthStore = create<IUseAuthStore>()(
    devtools(
        immer((set, get) => ({
            user: {} as IUser,
            isAuth: false,
            isLoading: false,
            authErrorStr: "",
            login: async (login: string, password: string) => {
                try {
                    const response = await $api.post<IAuthResponse>(
                        "/login",
                        { login, password },
                        {
                            withCredentials: true
                        }
                    );
                    localStorage.setItem("token", response.data.accessToken);
                    set({ isAuth: true });
                    set({ user: response.data.user });
                    set({ authErrorStr: "" });
                } catch (e: any) {
                    set({ authErrorStr: e.response?.data?.message });
                }
            },
            registration: async (login: string, password: string) => {
                try {
                    const response = await $api.post<IAuthResponse>(
                        "/registration",
                        {
                            login,
                            password
                        },
                        {
                            withCredentials: true
                        }
                    );
                    localStorage.setItem("token", response.data.accessToken);
                    set({ isAuth: true });
                    set({ user: response.data.user });
                    set({ authErrorStr: "" });
                } catch (e: any) {
                    set({ authErrorStr: e.response?.data?.message });
                }
            },
            logout: async () => {
                try {
                    await $api.post("/logout", undefined, {
                        withCredentials: true
                    });
                    localStorage.removeItem("token");
                    set({ isAuth: false });
                    set({ user: {} as IUser });
                } catch (e: any) {
                    console.log(e.response?.data?.message);
                }
            },
            checkAuth: async () => {
                set({ isLoading: true });
                try {
                    const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
                        withCredentials: true
                    });
                    localStorage.setItem("token", response.data.accessToken);
                    set({ isAuth: true });
                    set({ user: response.data.user });
                } catch (e: any) {
                    console.log(e.response?.data?.message);
                } finally {
                    set({ isLoading: false });
                }
            }
        }))
    )
);

export default useAuthStore;
