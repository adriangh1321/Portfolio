import { Location } from 'src/app/models/Location';
export class Experience {
    private _id:number;
    private _position: String;
    private _company: string;
    private _description: String;
    private _image: String;
    private _startDate: Date|null
    private _endDate: Date|null;
    private _location:Location;


    constructor() {
        this._id=0
        this._position = ""
        this._company = ""
        this._description = ""
        this._image = ""
        this._startDate = null
        this._endDate = null
        this._location=new Location()

    }

    public static factoryAllProperties(position: String, company: string, description: string, image: string, startDate: Date|null, endDate: Date|null, location:Location): Experience {
        const experience: Experience = new Experience();
        experience.position = position;
        experience.company=company
        experience.description = description;
        experience.image = image;
        experience.startDate=startDate
        experience.endDate=endDate
        experience.location=location
        return experience;
    }

    
    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
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

    public get location(): Location {
        return this._location;
    }

    public set location(location: Location) {
        this._location = location;
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