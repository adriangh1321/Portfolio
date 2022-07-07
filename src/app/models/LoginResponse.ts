import { User } from "./User";

export class LoginResponse {

    private _jwt: string;
    private _user: User

    constructor(_jwt: string, _user:User) {
        this._jwt = _jwt
        this._user = _user
    }

    public get jwt(): string {
        return this._jwt;
    }

    public set jwt(jwt: string
    ) {
        this._jwt = jwt;
    }

    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }

}