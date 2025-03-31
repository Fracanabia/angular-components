import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export interface FormSchema {
  title: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'json' | 'array';
  options?: { label: string; value: any }[];
  fields?: FormField[];
  validations?: {
    readonly?: boolean | '';
    required?: boolean | '';
    min?: number | '';
    max?: number | '';
    email?: boolean | '';
    pattern?: string;
  };
  conditional?: {
    field: string;
    value: any;
    operator?: '===' | '!==' | '>' | '<' | '>=' | '<=' | '';
  };
  value?: any;
}

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent implements OnInit {
  @Input() schema!: FormSchema;
  @Input() isRecursive = false;
  @Input() debug = true;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.schema) {
      this.formGroup = this.createFormGroup(this.schema.fields);
      this.formGroup.valueChanges.subscribe(() => {
        // console.log(this.formGroup);
      });
    } else {
      throw new Error('Schema is required to initialize the form.');
    }
  }

  sanitizeObject(obj: any): any {
    if (Array.isArray(obj)) {
      const sanitizedArray = obj
        .map(this.sanitizeObject.bind(this))
        .filter((item) => item !== undefined);
      return sanitizedArray.length > 0 ? sanitizedArray : undefined;
    }

    if (obj && typeof obj === 'object') {
      const sanitizedObj = Object.entries(obj).reduce((acc, [key, value]) => {
        const sanitizedValue = this.sanitizeObject(value);
        if (sanitizedValue !== undefined) {
          acc[key] = sanitizedValue;
        }
        return acc;
      }, {} as any);
      return Object.keys(sanitizedObj).length > 0 ? sanitizedObj : undefined;
    }

    return obj === '' ? undefined : obj;
  }

  createFormGroup(fields: FormField[]): FormGroup {
    const group = this.fb.group({}); // Inicializa o FormGroup vazio

    fields.forEach((field) => {
      const initialValue = field.value || '';
      if (field.conditional) {
        group.get(field.conditional.field)?.valueChanges.subscribe(() => {
          group.updateValueAndValidity();
        });
      }
      // Para campos tipo 'json', criamos um grupo aninhado
      if (field.type === 'json' && field.fields?.length) {
        group.addControl(field.name, this.createFormGroup(field.fields)); // Recursão para campos JSON
      }
      // Para campos do tipo 'array', criamos um FormArray
      else if (field.type === 'array' && field.fields?.length) {
        if (this.isRecursive) {
          const formArray = this.fb.array([]);
          group.addControl(field.name, formArray); // Adiciona o FormArray
        } else {
          const formArray = this.fb.array(
            field.fields?.map((field) => this.createFormGroup([field])) || []
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
}
