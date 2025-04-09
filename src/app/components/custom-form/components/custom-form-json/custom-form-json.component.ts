import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../custom-form.component';

@Component({
  selector: 'app-custom-form-json',
  templateUrl: './custom-form-json.component.html',
  styleUrls: ['./custom-form-json.component.scss'],
})
export class CustomFormJsonComponent {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;


  getFormGroup(form: FormGroup, fieldName: string): FormGroup {
    return form.get(fieldName) as FormGroup;
  }
}
