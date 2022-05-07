export class ContactInformation {
    private _id:number;  
    private _phone: string;
    private _email: string;
    private _linkedIn: string;
    private _remoteRepository: string;

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get phone(): string
 {
        return this._phone;
    }

    public set phone(phone: string
) {
        this._phone = phone;
    }

    public get email(): string
 {
        return this._email;
    }

    public set email(email: string
) {
        this._email = email;
    }

    public get linkedIn(): string
 {
        return this._linkedIn;
    }

    public set linkedIn(linkedIn: string
) {
        this._linkedIn = linkedIn;
    }

    public get remoteRepository(): string {
        return this._remoteRepository;
    }

    public set remoteRepository(remoteRepository: string) {
        this._remoteRepository = remoteRepository;
    }

  constructor(
) {
    this._id=0
    this._phone = ""
    this._email = ""
    this._linkedIn = ""
    this._remoteRepository = ""
  }

  public static factoryAllProperties(phone:string,email:string,linkedIn:string,remoteRepository:string):ContactInformation{
      const contactInformation:ContactInformation=new ContactInformation();
      contactInformation.phone=phone;
      contactInformation.email=email;
      contactInformation.linkedIn=linkedIn;
      contactInformation.remoteRepository=remoteRepository;
      return contactInformation;
  }

}