import { Component } from '@angular/core';
import { schemaFormFields } from '../custom-form/base';
import { FormField, FormSchema } from '../custom-form/custom-form.component';

@Component({
  selector: 'app-create-fields',
  templateUrl: './create-fields.component.html',
  styleUrls: ['./create-fields.component.scss'],
})
export class CreateFieldsComponent {
  schemaBase = schemaFormFields;
  schemaGenerated!: FormSchema;

  generatedFormFields(fields: FormField[]) {
    this.schemaGenerated = {
      title: 'Schema Generated',
      fields,
    };
  }
}
