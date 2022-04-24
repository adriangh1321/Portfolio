export class Proyect{
    private _name:string;
    private _description:string;
 
    constructor(){
        this._name='';
        this._description='';
    }

    public static factoryAllProperties(name:string,description:string):Proyect{
        const proyect:Proyect=new Proyect();
        proyect.name=name;
        proyect.description=description;
        return proyect;
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
    

    
}