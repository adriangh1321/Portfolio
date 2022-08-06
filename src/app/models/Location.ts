import { Region } from "./Region"

export class Location {
    private _id: number
    private _address: string
    private _region: Region

    constructor(_id: number, _address: string, _region: Region) {
        this._id = _id
        this._address = _address
        this._region = _region
    }


    public get id(): number {
        return this._id;
    }

    public set id(id: number
    ) {
        this._id = id;
    }

    public get address(): string {
        return this._address;
    }

    public set address(address: string
    ) {
        this._address = address;
    }

    public get region(): Region {
        return this._region;
    }

    public set region(region: Region) {
        this._region = region;
    }


}