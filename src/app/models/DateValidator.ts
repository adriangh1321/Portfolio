import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function dateValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let e = document.getElementById('alfa') as HTMLInputElement
    
    // console.log(e.checkValidity() ? e.value : 'partial');
  //   e.addEventListener("blur", function() {
  //     console.log("valueMissing : " + e.validity.valueMissing);
  //     console.log("badInput : " + e.validity.badInput);
  //     console.log("valid : " + e.validity.valid);
  //     console.log("value : " + e.value);
  // });
    // console.log(control.value)
    // console.log((control.value as String) == '')
    const forbidden = nameRe.test(control.value);
    return forbidden || e.checkValidity() ? null : { datePattern: { value: control.value } };
  };
}

@Directive({
  selector: '[appDateValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true }]
})
export class DateValidatorDirective implements Validator {
  @Input('appForbiddenName') datePattern = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.datePattern ? dateValidator(new RegExp(this.datePattern, 'i'))(control)
      : null;
  }

}