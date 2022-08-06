import { Country } from "./Country"

export class Region {
    private _id: number
    private _name: string
    private _country: Country

    constructor(_id: number, _name: string, _country: Country) {
        this._id = _id
        this._name = _name
        this._country = _country
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

    public set name(name: string
    ) {
        this._name = name;
    }

    public get country(): Country {
        return this._country;
    }

    public set country(country: Country) {
        this._country = country;
    }

}