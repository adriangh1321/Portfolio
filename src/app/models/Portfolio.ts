
import { ContactInformation } from "./ContactInformation";
import { CurrentCompany } from "./CurrentCompany";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Interest } from "./Interest";
import { Project } from "./Project";
import { Skill } from "./Skill";
import { User } from "./User";
import { Location } from "./Location";


export class Portfolio {
    private _id: number;
    private _firstname: string;
    private _lastname: string;
    private _occupation: string;
    private _currentCompany: CurrentCompany;
    private _location: Location;
    private _image: string;
    private _banner: string;
    private _aboutMe: string;
    private _experiences: Experience[];
    private _educations: Education[];
    private _contactInformation: ContactInformation;
    private _skills: Skill[]
    private _projects: Project[]
    private _interests: Interest[];





    public get interests(): Interest[] {
        return this._interests;
    }

    public set interests(interests: Interest[]) {
        this._interests = interests;
    }


    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get projects(): Project[] {
        return this._projects;
    }

    public set projects(projects: Project[]) {
        this._projects = projects;
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

    public get location(): Location {
        return this._location;
    }

    public set location(location: Location) {
        this._location = location;
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

    public get occupation(): string {
        return this._occupation;
    }

    public set occupation(occupation: string
    ) {
        this._occupation = occupation;
    }

    public get image(): string {
        return this._image;
    }

    public set image(image: string
    ) {
        this._image = image;
    }

    public get banner(): string {
        return this._banner;
    }
    public set banner(value: string) {
        this._banner = value;
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
        this._id = 0;
        this._firstname = "firstname"
        this._lastname = "lastname"
        this._occupation = "occupation"
        this._currentCompany = new CurrentCompany();
        this._location =new Location()
        this._image = ""
        this._banner = ""
        this._aboutMe = "aboutMe"
        this._experiences = [];
        this._educations = [];
        this._contactInformation = new ContactInformation();
        this._skills = []
        this._projects = []
        this._interests = []


    }




}