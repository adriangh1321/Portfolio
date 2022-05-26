import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isInvalid = (control.value as string).trim().length == 0 && (control.value as string).length>=1
        
        return isInvalid ? { onlyWhitespace: { value: control.value } } : null;
    };
}