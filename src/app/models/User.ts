export class User {

    private _email: string;
    private _nickname: string;

    constructor() {
        this._email =""
        this._nickname =""
       
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string
    ) {
        this._email = email;
    }

    public get nickname(): string {
        return this._nickname;
    }

    public set nickname(nickname: string) {
        this._nickname = nickname;
    }


}