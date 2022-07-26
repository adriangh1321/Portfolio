export class Project{
    private _id:number;
    private _name:string;
    private _description:string;
    private _image:string;
    private _startDate:Date|null;
    private _endDate:Date|null;
    private _url:string;

    constructor(){
        this._id=0;
        this._name='';
        this._description='';
        this._image='';
        this._startDate=null;
        this._endDate=null;
        this._url='';
    }

    public static factoryAllProperties(name:string,description:string):Project{
        const project:Project=new Project();
        project.name=name;
        project.description=description;
        return project;
    }


    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }


    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get image(): string
    {
           return this._image;
       }
   
       public set image(image: string
   ) {
           this._image = image;
       }
   
       public get startDate(): Date|null
    {
           return this._startDate;
       }
   
       public set startDate(startDate: Date|null
   ) {
           this._startDate = startDate;
       }
   
       public get endDate(): Date|null
    {
           return this._endDate;
       }
   
       public set endDate(endDate: Date|null
   ) {
           this._endDate = endDate;
       }
   
       public get url(): string {
           return this._url;
       }
   
       public set url(url: string) {
           this._url = url;
       }

    toContract() {
        const result:any = {};
        for (let key in this) {
            
            result[key.replace('_', '')] = this[key];
            
        }
        return result;
    }
    

    
}