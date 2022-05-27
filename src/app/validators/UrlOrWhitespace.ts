import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function urlOrWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg: RegExp = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?', 'i')
        let isValid: boolean = false
        if (control.value != null) {
            isValid = reg.test(control.value as string) || (control.value as string).trim().length == 0
        }

        return isValid ? null : { urlOrWhitespace: { value: control.value } };
    };
}