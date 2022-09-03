import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function maxFileSize(maxSize:number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value==null || control.value==undefined || (control.value as string).includes("./assets/img/") ){
            return null;
        }
        const b64=control.value
        const b64str= b64.split('base64,')[1];
        const decoded =atob(b64str)
        // console.log(decoded.length + ' Bytes');

        //log / access file size in Mb
        // console.log(decoded.length/1024/1024 + ' MB');
        return decoded.length/1024/1024 < maxSize ? null : { maxFileSize: { value: decoded.length/1024/1024 } };
    };
}