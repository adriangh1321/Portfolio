export class Education {
    private _id:number;
    private _title: String;
    private _institute: String;
    private _startDate: Date | null;
    private _endDate: Date | null;
    private _image: String;

    
    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }


    public get title(): String {
        return this._title;
    }

    public set title(title: String
    ) {
        this._title = title;
    }

    public get institute(): String {
        return this._institute;
    }

    public set institute(institute: String
    ) {
        this._institute = institute;
    }

    public get startDate(): Date | null {
        return this._startDate;
    }

    public set startDate(startDate: Date | null
    ) {
        this._startDate = startDate;
    }

    public get endDate(): Date | null {
        return this._endDate;
    }

    public set endDate(endDate: Date | null
    ) {
        this._endDate = endDate;
    }

    public get image(): String {
        return this._image;
    }

    public set image(image: String) {
        this._image = image;
    }


    constructor() {
        this._id=0
        this._title = ""
        this._institute = ""
        this._startDate = null
        this._endDate = null
        this._image = ""
    }

    public static factoryAllProperties(title: String, institute: string, startDate: Date | null, endDate: Date | null, image: string): Education {
        const education: Education = new Education();
        education.title = title;
        education.institute = institute;
        education.startDate = startDate;
        education.endDate = endDate;
        education.image = image;
        return education;
    }

    toContract() {
        const result:any = {};
        for (let key in this) {
            
            result[key.replace('_', '')] = this[key];
            
        }
        return result;
    }

}