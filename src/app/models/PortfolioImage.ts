export class PortfolioImage {
    private _image: string;

    constructor(_image: string) {
        this._image = _image
    }


    public get image(): string {
        return this._image;
    }

    public set image(image: string) {
        this._image = image;
    }

}