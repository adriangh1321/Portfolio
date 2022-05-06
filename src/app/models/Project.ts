export class Project{
    private _name:string;
    private _description:string;
 
    constructor(){
        this._name='';
        this._description='';
    }

    public static factoryAllProperties(name:string,description:string):Project{
        const project:Project=new Project();
        project.name=name;
        project.description=description;
        return project;
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

    toContract() {
        const result:any = {};
        for (let key in this) {
            
            result[key.replace('_', '')] = this[key];
            
        }
        return result;
    }
    

    
}