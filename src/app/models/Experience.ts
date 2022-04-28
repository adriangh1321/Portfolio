export class Experience {
    private _position: String;
    private _company: string;
    private _description: String;
    private _image: String;
    private _startDate: Date|null
    private _endDate: Date|null;
    private _state: String;
    private _country: String;


    constructor() {

        this._position = ""
        this._company = ""
        this._description = ""
        this._image = ""
        this._startDate = null
        this._endDate = null
        this._state = ""
        this._country = ""

    }

    public static factoryAllProperties(position: String, company: string, description: string, image: string, startDate: Date|null, endDate: Date|null, state: string, country: string): Experience {
        const experience: Experience = new Experience();
        experience.position = position;
        experience.company=company
        experience.description = description;
        experience.image = image;
        experience.startDate=startDate
        experience.endDate=endDate
        experience.state=state
        experience.country=country
        return experience;
    }

    public get position(): String {
        return this._position;
    }

    public set position(position: String
    ) {
        this._position = position;
    }

    public get description(): String {
        return this._description;
    }

    public set description(description: String
    ) {
        this._description = description;
    }

    public get image(): String {
        return this._image;
    }

    public set image(image: String) {
        this._image = image;
    }


    public get startDate(): Date |null{
        return this._startDate;
    }

    public set startDate(startDate: Date|null
    ) {
        this._startDate = startDate;
    }

    public get endDate(): Date|null {
        return this._endDate;
    }

    public set endDate(endDate: Date|null
    ) {
        this._endDate = endDate;
    }

    public get state(): String {
        return this._state;
    }

    public set state(state: String
    ) {
        this._state = state;
    }

    public get country(): String {
        return this._country;
    }

    public set country(country: String) {
        this._country = country;
    }


    public get company(): string {
        return this._company;
    }

    public set company(company: string) {
        this._company = company;
    }

    toContract() {
        const result:any = {};
        for (let key in this) {
            
            result[key.replace('_', '')] = this[key];
            
        }
        return result;
    }

}