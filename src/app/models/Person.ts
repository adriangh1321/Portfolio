import { ContactInformation } from "./ContactInformation";
import { CurrentCompany } from "./CurrentCompany";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Proyect } from "./Proyect";
import { Skill } from "./Skill";


export class Person {
    private _firstname: string;
    private _lastname: string;
    private _ocupation: string;
    private _currentCompany: CurrentCompany;  
    private _country: string;
    private _state: string;
    private _image: string;
    private _aboutMe: string;
    private _experiences: Experience[];
    private _educations: Education[];
    private _contactInformation: ContactInformation;
    private _skills:Skill[]
    private _proyects:Proyect[]
    
    public get proyects(): Proyect[] {
        return this._proyects;
    }

    public set proyects(proyects: Proyect[]) {
        this._proyects = proyects;
    }

    public get skills(): Skill[] {
        return this._skills;
    }

    public set skills(skills: Skill[]) {
        this._skills = skills;
    }
    
    public get currentCompany(): CurrentCompany {
        return this._currentCompany;
    }

    public set currentCompany(currentCompany: CurrentCompany) {
        this._currentCompany = currentCompany;
    }

    public get contactInformation(): ContactInformation {
        return this._contactInformation;
    }

    public set contactInformation(contactInformation: ContactInformation) {
        this._contactInformation = contactInformation;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public set firstname(firstname: string
    ) {
        this._firstname = firstname;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public set lastname(lastname: string
    ) {
        this._lastname = lastname;
    }

    public get ocupation(): string {
        return this._ocupation;
    }

    public set ocupation(ocupation: string
    ) {
        this._ocupation = ocupation;
    }

    public get country(): string {
        return this._country;
    }

    public set country(country: string
    ) {
        this._country = country;
    }

    public get state(): string {
        return this._state;
    }

    public set state(state: string
    ) {
        this._state = state;
    }

    public get image(): string {
        return this._image;
    }

    public set image(image: string
    ) {
        this._image = image;
    }

    public get aboutMe(): string {
        return this._aboutMe;
    }

    public set aboutMe(aboutMe: string
    ) {
        this._aboutMe = aboutMe;
    }

    public get experiences(): Experience[] {
        return this._experiences;
    }

    public set experiences(experiences: Experience[]
    ) {
        this._experiences = experiences;
    }

    public get educations(): Education[] {
        return this._educations;
    }

    public set educations(educations: Education[]) {
        this._educations = educations;
    }



    constructor() {
        this._firstname = "firstname"
        this._lastname = "lastname"
        this._ocupation = "ocupation"
        this._currentCompany = new CurrentCompany();
        this._country = "country"
        this._state = "state"
        this._image = ""
        this._aboutMe = "aboutMe"
        this._experiences = [];
        this._educations = [];
        this._contactInformation = new ContactInformation();
        this._skills=[]
        this._proyects=[]
    
    }




}