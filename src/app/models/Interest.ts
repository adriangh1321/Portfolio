export class Interest{
    private _id:number;
    private _name:string;
    private _image:string;

    constructor(){
        this._id=0;
        this._name="";
        this._image=""
    }

    public static factoryAllProperties(id:number,name:string,image:string):Interest{
        const interest=new Interest();
        interest._id=id;
        interest._name=name;
        interest._image=image;
        return interest;
    }

    public get id(): number
 {
        return this._id;
    }

    public set id(id: number
) {
        this._id = id;
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


}