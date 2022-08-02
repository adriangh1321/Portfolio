import { CurrentCompany } from "./CurrentCompany";

export class PortfolioBasicInfo{
    private _id: number;
    private _firstname: string;
    private _lastname: string;
    private _occupation: string;
    private _currentCompany: CurrentCompany;
    private _country: string;
    private _state: string;
    private _image: string;

  constructor(
    id: number, 
    firstname: string, 
    lastname: string, 
    occupation: string, 
    currentCompany: CurrentCompany, 
    country: string, 
    state: string,
    image:string
) {
    this._id = id
    this._firstname = firstname
    this._lastname = lastname
    this._occupation = occupation
    this._currentCompany = currentCompany
    this._country = country
    this._state = state
    this._image = image

  }

    public get id(): number
 {
        return this._id;
    }

    public set id(id: number
) {
        this._id = id;
    }

    public get firstname(): string
 {
        return this._firstname;
    }

    public set firstname(firstname: string
) {
        this._firstname = firstname;
    }

    public get lastname(): string
 {
        return this._lastname;
    }

    public set lastname(lastname: string
) {
        this._lastname = lastname;
    }

    public get occupation(): string
 {
        return this._occupation;
    }

    public set occupation(occupation: string
) {
        this._occupation = occupation;
    }

    public get currentCompany(): CurrentCompany
 {
        return this._currentCompany;
    }

    public set currentCompany(currentCompany: CurrentCompany
) {
        this._currentCompany = currentCompany;
    }

    public get country(): string
 {
        return this._country;
    }

    public set country(country: string
) {
        this._country = country;
    }

    public get state(): string
 {
        return this._state;
    }

    public set state(state: string
) {
        this._state = state;
    }

    public get image(): string {
        return this._image;
    }

    public set image(image: string) {
        this._image = image;
    }

}