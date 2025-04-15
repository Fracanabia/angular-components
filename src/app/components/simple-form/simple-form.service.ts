import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const base: FieldSchema[] = [
  {
    name: 'name',
    label: 'Nome do Campo',
    type: 'text',
    validations: { required: true },
  },
  {
    name: 'label',
    label: 'Label',
    type: 'text',
    validations: { required: true },
  },
  {
    name: 'type',
    label: 'Tipo de Campo',
    type: 'select',
    options: [
      { label: 'Texto', value: 'text' },
      { label: 'Número', value: 'number' },
      { label: 'Seleção', value: 'select' },
      { label: 'Radio', value: 'radio' },
      { label: 'Checkbox', value: 'checkbox' },
      { label: 'Json', value: 'json' },
      { label: 'Array', value: 'array' },
    ],
    validations: { required: true },
  },
  {
    name: 'options',
    label: 'Opções (Para Select/Radio/Checkbox)',
    type: 'array',
    conditional: { field: 'type', value: ['select', 'radio', 'checkbox'] },
    fields: [
      {
        name: 'value',
        label: 'Valor',
        type: 'text',
        validations: { required: true },
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        validations: { required: true },
      },
    ],
  },
  {
    name: 'validations',
    label: 'Validações',
    type: 'json',
    conditional: {
      field: 'type',
      value: ['text', 'number', 'select', 'radio', 'checkbox'],
    },
    fields: [
      {
        name: 'required',
        label: 'Obrigatório',
        type: 'checkbox',
        value: false,
      },
      {
        name: 'readonly',
        label: 'Somente Leitura',
        type: 'checkbox',
        value: false,
      },
      {
        name: 'min',
        label: 'Mínimo',
        type: 'number',
        conditional: { field: 'type', value: 'number' },
      },
      {
        name: 'max',
        label: 'Máximo',
        type: 'number',
        conditional: { field: 'type', value: 'number' },
      },
      { name: 'email', label: 'Validação de Email', type: 'checkbox' },
      { name: 'pattern', label: 'Regex Pattern', type: 'text' },
    ],
  },
  {
    name: 'conditional',
    label: 'Condição de Exibição',
    type: 'json',
    conditional: {
      field: 'type',
      value: ['text', 'number', 'select', 'radio', 'checkbox'],
    },
    fields: [
      { name: 'field', label: 'Campo Dependente', type: 'text' },
      { name: 'value', label: 'Valor Esperado', type: 'text' },
      {
        name: 'operator',
        label: 'Operador',
        type: 'select',
        options: [
          { label: '===', value: '===' },
          { label: '!==', value: '!==' },
          { label: '>', value: '>' },
          { label: '<', value: '<' },
          { label: '>=', value: '>=' },
          { label: '<=', value: '<=' },
        ],
      },
    ],
  },
  {
    name: 'value',
    label: 'Valor Padrão',
    type: 'text',
    conditional: {
      field: 'type',
      value: ['text', 'number', 'select', 'radio', 'checkbox'],
    },
  },
  {
    name: 'fields',
    label: 'JSON',
    type: 'array',
    conditional: { field: 'type', value: 'json' },
    fields: [],
    isRecursive: true,
  },
  {
    name: 'fields',
    label: 'ARRAY',
    type: 'array',
    conditional: { field: 'type', value: 'array' },
    fields: [],
    isRecursive: true,
  },
];

export type FieldSchema = {
  isRecursive?: boolean;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'json' | 'array';
  options?: { label: string; value: any }[];
  fields?: FieldSchema[];
  rules?: string[];
  validations?: {
    readonly?: boolean | '' | null;
    required?: boolean | '' | null;
    min?: number | '' | null;
    max?: number | '' | null;
    email?: boolean | '' | null;
    pattern?: string | '' | null;
  };
  conditional?: {
    field: string | '' | null;
    value: any;
    operator?: '===' | '!==' | '>' | '<' | '>=' | '<=' | '' | null;
  };
  value?: any;
};

@Injectable()
export class SimpleFormService {
  constructor(private readonly _formBuilder: FormBuilder) {}

  public buildForm(
    schema: FieldSchema[],
    data: any = {},
    { newItem }: { newItem: boolean }
  ): FormGroup {
    const group = this._formBuilder.group({});

    schema.forEach((field) => {
      const fieldValue = data[field.name] ?? null;

      if (field.type === 'json' && field.fields) {
        group.addControl(
          field.name,
          this.buildForm(field.fields, fieldValue || {}, { newItem })
        );
      } else if (field.type === 'array' && field.fields) {
        const items = Array.isArray(fieldValue) ? fieldValue : [];
        group.addControl(
          field.name,
          this._formBuilder.array(
            items.map((item) =>
              this.buildForm(field.fields || [], item, { newItem })
            )
          )
        );
      } else {
        const controlValue = newItem ? '' : fieldValue ?? field.value ?? '';
        group.addControl(
          field.name,
          this._formBuilder.control(controlValue, this.getValidators(field))
        );
        group.get(field.name)?.valueChanges.subscribe((value) => {
          field.value = value;
        });
      }
    });

    return group;
  }

  private getValidators(field: FieldSchema): ValidatorFn[] {
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
