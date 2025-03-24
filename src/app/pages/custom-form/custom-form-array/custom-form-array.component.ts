import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FormField } from '../custom-form.component';

@Component({
  selector: 'app-custom-form-array',
  templateUrl: './custom-form-array.component.html',
  styleUrls: ['./custom-form-array.component.scss'],
})
export class CustomFormArrayComponent {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  getFormArray(form: FormGroup, fieldName: string): FormArray {
    return form.get(fieldName) as FormArray;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

    createFormGroup(fields: FormField[]): FormGroup {
      const group: { [key: string]: AbstractControl } = {};

      fields.forEach((field) => {
        if (field.type === 'json') {
          group[field.name] = this.createFormGroup(field.fields || []);
        } else if (field.type === 'array') {
          const formArray = this.fb.array([]);
          group[field.name] = formArray;
        } else {
          group[field.name] = this.fb.control(
            field.value || '',
            this.getValidators(field.validations)
          );
        }
      });

      return this.fb.group(group);
    }

    getValidators(validations: any) {
      const validators = [];
      if (validations?.required) {
        validators.push(Validators.required);
      }
      return validators;
    }

    addItem(): void {
      const formArray = this.getFormArray(this.formGroup, this.field.name);
      const newItemGroup = this.createFormGroup(this.field.fields || []);
      formArray.push(newItemGroup);
    }


  removeItem(index: number): void {
    const formArray = this.getFormArray(this.formGroup, this.field.name);
    formArray.removeAt(index);
  }
}
