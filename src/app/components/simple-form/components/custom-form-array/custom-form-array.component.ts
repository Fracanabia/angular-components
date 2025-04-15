import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {
  base,
  FieldSchema,
  SimpleFormService,
} from '../../simple-form.service';

@Component({
  selector: 'app-custom-form-array',
  templateUrl: './custom-form-array.component.html',
  styleUrls: ['./custom-form-array.component.scss'],
})
export class CustomFormArrayComponent {
  @Input() field!: FieldSchema;
  @Input() formGroup!: FormGroup;

  constructor(private readonly _simpleFormService: SimpleFormService) {}

  getFormArray(): FormArray {
    return this.formGroup.get(this.field.name) as FormArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addItem() {
    if (this.field.isRecursive) {
      this.field.fields = JSON.parse(JSON.stringify(base));
    }
    const group = this._simpleFormService.buildForm(this.field.fields || [], {}, {
      newItem: true,
    });
    this.getFormArray().push(group);
  }

  removeItem(index: number) {
    this.getFormArray().removeAt(index);
  }
}
