import { Region } from "./Region"

export class Location {
    private _id: number
    private _address: string
    private _region: Region|null



    constructor(){
        this._id =0
        this._address =''
        this._region = null
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

    public get region(): Region|null {
        return this._region;
    }

    public set region(region: Region|null) {
        this._region = region;
    }


}