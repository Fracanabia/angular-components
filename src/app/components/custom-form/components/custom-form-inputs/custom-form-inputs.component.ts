import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../custom-form.component';

@Component({
  selector: 'app-custom-form-inputs',
  templateUrl: './custom-form-inputs.component.html',
  styleUrls: ['./custom-form-inputs.component.scss'],
})
export class CustomFormInputsComponent {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;
  @Input() rootFormGroup!: FormGroup;
  @Input() isRecursive = false;

  isFieldVisible(field: FormField): boolean {
    if (
      !field.conditional ||
      !field.conditional.field ||
      !field.conditional.value
    )
      return true;

    const control =
      this.formGroup.get(field.conditional.field) ||
      this.rootFormGroup.get(field.conditional.field);
    if (!control) return false;

    const selectedValue = control.value;
    const expectedValue = field.conditional.value;
    const operator = field.conditional.operator || '===';

    if (Array.isArray(expectedValue)) {
      switch (operator) {
        case '===':
          return expectedValue.includes(selectedValue);
        case '!==':
          return !expectedValue.includes(selectedValue);
        default:
          return false;
      }
    }
    switch (operator) {
      case '===':
        return selectedValue === expectedValue;
      case '!==':
        return selectedValue !== expectedValue;
      case '>':
        return selectedValue > expectedValue;
      case '<':
        return selectedValue < expectedValue;
      case '>=':
        return selectedValue >= expectedValue;
      case '<=':
        return selectedValue <= expectedValue;
      default:
        return true;
    }
  }
}
