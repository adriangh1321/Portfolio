export class CurrentCompany{
    private _id:number; 
    private _name:string;
    private _image:string;
    private _url:string;

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get url(): string {
        return this._url;
    }

    public set url(url: string) {
        this._url = url;
    }


    public get name(): string
 {
        return this._name;
    }

    public set name(name: string
) {
        this._name = name;
    }

    public get image(): string {
        return this._image;
    }

    public set image(image: string) {
        this._image = image;
    }


    constructor(){
        this._id=0;
        this._name="";
        this._image=""
        this._url=";"
    }


}