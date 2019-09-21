import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})

export class ConfirmPasswordDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    const password = control.parent.value.password;
    const confirmedPassword = control.value;
    if (confirmedPassword && password !== confirmedPassword) {
      return { passwordsDoesntMatch: {desc: `Password is '${password}' and confirmed password is '${confirmedPassword}'`}};
    }
    return null;
  }

}
