export class Country {
    private _id: number
    private _name: string

    constructor(_id: number, _name: string) {
        this._id = _id
        this._name = _name
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number
    ) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }


}