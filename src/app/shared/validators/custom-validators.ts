import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

export class CustomValidators {
  static passwordsMatch(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;
    return function matchOtherValidate(control: FormControl) {
      if (!control.parent) return null;

      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => (thisControl.updateValueAndValidity()));
      }

      if (!otherControl) return null;
      if (otherControl.value !== thisControl.value) return { passwordMismatch: true };
      return null;
    };
  }

  static password(c: FormControl): { [s: string]: boolean } {
    return c.value && c.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\#\$\%\&\-\_\~])[a-zA-Z\d\!\#\$\%\&\-\_\~]{6,255}$/) ? null : { password: true };
  }

  static noSpace(c: FormControl): { [s: string]: boolean } {
    return c.value && c.value.match(/\s/) ? { noSpace: true } : null;
  }

  static email(c: FormControl): { [s: string]: boolean } {
    return c.value && c.value.match(/^([a-zA-Z0-9-_\.\+]+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? null : { email: true };
  }

  static notBeInFuture(c: FormControl): { [s: string]: boolean } {
    let isSelectedDayInFuture = false;
    const date: Date = _.get(c.value, 'jsdate');
    if (date) {
      const todayDate = new Date();
      const today = new Date(+new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()) + 1000 * 60 * 60 * 24 - 1);
      isSelectedDayInFuture = date.getTime() <= today.getTime();
    }

    return isSelectedDayInFuture ? null : { notBeInFuture: true };
  }

  static positive(c: FormControl): { [s: string]: boolean } {
    return c.value && +parseFloat(c.value).toFixed(2) > 0 ? null : { positive: true };
  }
}
