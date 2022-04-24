import { SkillType } from "../enums/SkillType";

export class Skill {
    private _type: SkillType;
    private _name: string;
    private _percent: number;

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
        this._type = SkillType.NONE
        this._name = ''
        this._percent = 0
    }


}