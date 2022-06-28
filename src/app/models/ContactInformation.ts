export class ContactInformation {
    private _id:number;  
    private _phone: string;
    private _email: string;
    private _linkedIn: string;
    private _remoteRepository: string;
    private _facebook:string;
    private _twitter:string;
    private _instagram:string;

    public get facebook(): string
 {
        return this._facebook;
    }

    public set facebook(facebook: string
) {
        this._facebook = facebook;
    }

    public get twitter(): string
 {
        return this._twitter;
    }

    public set twitter(twitter: string
) {
        this._twitter = twitter;
    }

    public get instagram(): string {
        return this._instagram;
    }

    public set instagram(instagram: string) {
        this._instagram = instagram;
    }


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
    this._facebook=""
    this._twitter=""
    this._instagram=""
  }

  public static factoryAllProperties(phone:string,email:string,linkedIn:string,remoteRepository:string,facebook:string,twitter:string,instagram:string):ContactInformation{
      const contactInformation:ContactInformation=new ContactInformation();
      contactInformation.phone=phone;
      contactInformation.email=email;
      contactInformation.linkedIn=linkedIn;
      contactInformation.remoteRepository=remoteRepository;
      contactInformation.facebook=facebook
      contactInformation.twitter=twitter
      contactInformation.instagram=instagram
      return contactInformation;
  }

}