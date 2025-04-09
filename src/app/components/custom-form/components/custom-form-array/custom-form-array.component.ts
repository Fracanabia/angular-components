import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormField } from '../../custom-form.component';

@Component({
  selector: 'app-custom-form-array',
  templateUrl: './custom-form-array.component.html',
  styleUrls: ['./custom-form-array.component.scss'],
})
export class CustomFormArrayComponent {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;
  @Input() isRecursive = false;

  constructor(private fb: FormBuilder) {}

  getFormArray(form: FormGroup, fieldName: string): FormArray {
    return form.get(fieldName) as FormArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  createFormGroup(fields: FormField[], newItem = false): FormGroup {
    const group = this.fb.group({}); // Inicializa o FormGroup vazio

    fields.forEach((field) => {
      const initialValue = !newItem && field.value || '';
      if (field.conditional) {
        group.get(field.conditional.field)?.valueChanges.subscribe(() => {
          group.updateValueAndValidity();
        });
      }
      // Para campos tipo 'json', criamos um grupo aninhado
      if (field.type === 'json' && field.fields?.length) {
        group.addControl(field.name, this.createFormGroup(field.fields,newItem)); // Recursão para campos JSON
      }
      // Para campos do tipo 'array', criamos um FormArray
      else if (field.type === 'array' && field.fields?.length) {
        if (this.isRecursive) {
          const formArray = this.fb.array([]);
          group.addControl(field.name, formArray); // Adiciona o FormArray
        } else {
          const formArray = this.fb.array(
            field.fields?.map((field) => this.createFormGroup([field], newItem)) || []
          );
          group.addControl(field.name, formArray); // Adiciona o FormArray
        }
      }
      // Para outros tipos de campos, criamos um FormControl
      else {
        group.addControl(
          field.name,
          this.fb.control(initialValue, this.getValidators(field)) // Adiciona o FormControl
        );
      }
    });

    return group; // Retorna o FormGroup diretamente
  }

  private getValidators(field: FormField): ValidatorFn[] {
    const validators = [];

    if (field.validations?.required) {
      validators.push(Validators.required);
    }
    if (field.validations?.min) {
      validators.push(Validators.min(field.validations.min));
    }
    if (field.validations?.max) {
      validators.push(Validators.max(field.validations.max));
    }
    if (field.validations?.email) {
      validators.push(Validators.email);
    }
    if (field.validations?.pattern) {
      validators.push(Validators.pattern(field.validations.pattern));
    }

    return validators;
  }

  addItem(): void {
    if (this.isRecursive) {
      const formArray = this.getFormArray(this.formGroup, this.field.name);
      const newItemGroup = this.createFormGroup(this.field.fields || [], true);
      formArray.push(newItemGroup);
    } else if (this.field.fields && this.field.fields.length) {
      const formArray = this.getFormArray(this.formGroup, this.field.name);
      const newItemGroup = this.createFormGroup([this.field.fields[0]], true);
      formArray.push(newItemGroup);
    }
  }

  removeItem(index: number): void {
    const formArray = this.getFormArray(this.formGroup, this.field.name);
    formArray.removeAt(index);
  }
}
