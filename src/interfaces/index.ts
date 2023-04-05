export interface IUser {
    login: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IMsg {
    user: string;
    message: string;
}
