import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ProductValidator {
  static minDateValidator(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const minimumDate = new Date(minDate.toISOString().slice(0, 10));

      if (date.getTime() >= minimumDate.getTime()) {
        return null;
      } else {
        return { min: { value: control.value, expected: minDate } };
      }
    };
  }
}
