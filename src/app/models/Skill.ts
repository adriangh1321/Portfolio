import { SkillType } from "../enums/SkillType";

export class Skill {
    private _id:number;
    private _type: SkillType;
    private _name: string;
    private _percent: number;

    
    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get type(): SkillType {
        return this._type;
    }

    public set type(type: SkillType
    ) {
        this._type = type;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string
    ) {
        this._name = name;
    }

    public get percent(): number {
        return this._percent;
    }

    public set percent(percent: number) {
        this._percent = percent;
    }

    public static factoryAllProperties(type: SkillType, name: string, percent: number):Skill {
        const skill: Skill = new Skill()
        skill.type = type;
        skill.name = name;
        skill.percent = percent;
        return skill;
    }

    constructor() {
        this._id=0
        this._type = SkillType.NONE
        this._name = ''
        this._percent = 0
    }

    toContract() {
        const result:any = {};
        for (let key in this) {
            
            result[key.replace('_', '')] = this[key];
            
        }
        return result;
    }


}