import { Component } from '@angular/core';
interface Field {
  isRecursive?: boolean;
  name: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'object'
    | 'array';
  options?: { label: string; value: any }[];
  fields?: Field[];
  rules?: string[];
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

interface Schema {
  title: string;
  rules?: string[];
  fields: Field[];
}

const schemaBase: Schema = {
  title: 'Criar seu Formulário Personalizado',
  fields: [],
};

const baseFields: Field[] = [
  // {
  //   name: 'name',
  //   label: 'Nome do Campo',
  //   type: 'text',
  //   validations: { required: true },
  // },
  // {
  //   name: 'label',
  //   label: 'Label',
  //   type: 'text',
  //   validations: { required: true },
  // },
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
      { label: 'Json', value: 'object' },
      { label: 'Array', value: 'array' },
    ],
    validations: { required: true },
  },
  // {
  //   name: 'options',
  //   label: 'Opções (Para Select/Radio/Checkbox)',
  //   type: 'array',
  //   conditional: { field: 'type', value: ['select', 'radio', 'checkbox'] },
  //   fields: [
  //     {
  //       name: 'option',
  //       label: 'Opção',
  //       type: 'object',
  //       fields: [
  //         {
  //           name: 'value',
  //           label: 'Valor',
  //           type: 'text',
  //           validations: { required: true },
  //         },
  //         {
  //           name: 'label',
  //           label: 'Label',
  //           type: 'text',
  //           validations: { required: true },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'validations',
  //   label: 'Validações',
  //   type: 'object',
  //   conditional: {
  //     field: 'type',
  //     value: ['text', 'number', 'select', 'radio', 'checkbox'],
  //   },
  //   fields: [
  //     {
  //       name: 'required',
  //       label: 'Obrigatório',
  //       type: 'checkbox',
  //       value: false,
  //     },
  //     {
  //       name: 'readonly',
  //       label: 'Somente Leitura',
  //       type: 'checkbox',
  //       value: false,
  //     },
  //     {
  //       name: 'min',
  //       label: 'Mínimo',
  //       type: 'number',
  //       conditional: { field: 'type', value: 'number' },
  //     },
  //     {
  //       name: 'max',
  //       label: 'Máximo',
  //       type: 'number',
  //       conditional: { field: 'type', value: 'number' },
  //     },
  //     { name: 'email', label: 'Validação de Email', type: 'checkbox' },
  //     { name: 'pattern', label: 'Regex Pattern', type: 'text' },
  //   ],
  // },
  // {
  //   name: 'conditional',
  //   label: 'Condição de Exibição',
  //   type: 'object',
  //   conditional: {
  //     field: 'type',
  //     value: ['text', 'number', 'select', 'radio', 'checkbox'],
  //   },
  //   fields: [
  //     { name: 'field', label: 'Campo Dependente', type: 'text' },
  //     { name: 'value', label: 'Valor Esperado', type: 'text' },
  //     {
  //       name: 'operator',
  //       label: 'Operador',
  //       type: 'select',
  //       options: [
  //         { label: '===', value: '===' },
  //         { label: '!==', value: '!==' },
  //         { label: '>', value: '>' },
  //         { label: '<', value: '<' },
  //         { label: '>=', value: '>=' },
  //         { label: '<=', value: '<=' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'fields',
  //   label: 'JSON',
  //   type: 'array',
  //   isRecursive: true,
  //   conditional: { field: 'type', value: 'object' },
  //   fields: [],
  // },
  {
    name: 'fields',
    label: 'ARRAY',
    type: 'array',
    isRecursive: true,
    conditional: { field: 'type', value: 'array' },
    fields: [
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
          { label: 'Json', value: 'object' },
          { label: 'Array', value: 'array' },
        ],
        validations: { required: true },
      },
      {
        name: 'fields',
        label: 'ARRAY',
        type: 'array',
        isRecursive: true,
        conditional: { field: 'type', value: 'array' },
        fields: [],
      },
    ],
  },
  // {
  //   name: 'value',
  //   label: 'Valor Padrão',
  //   type: 'text',
  //   conditional: {
  //     field: 'type',
  //     value: ['text', 'number', 'select', 'radio', 'checkbox'],
  //   },
  // },
];

schemaBase.fields = baseFields;

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent {
  schema: Schema = JSON.parse(JSON.stringify(schemaBase));

  addItem(field: Field) {
    if (field.type === 'array' && field.fields) {
      if (field.isRecursive) {
        const clonedBaseFields = JSON.parse(JSON.stringify(baseFields));
        field.fields.push(...clonedBaseFields);
      } else {
        const newItem = this.createEmptyItem(field.fields[0]);
        field.fields.push(newItem);
      }
    }
  }

  createEmptyItem(template: Field): Field {
    const newItem = { ...template, value: undefined };

    if (template.fields) {
      newItem.fields = template.fields.map((subField) =>
        this.createEmptyItem(subField)
      );
    }

    return newItem;
  }

  removeItem(field: Field) {
    console.log('🚀 ~ SimpleFormComponent ~ removeItem ~ field:', field);
    if (field.fields && field.fields?.length > 1) {
      if (field.type === 'array') {
        field.fields = [];
      }
    }
  }

  buildFormObject(schema: Field[]): any {
    return schema.reduce((formObject: any, item) => {
      switch (item.type) {
        case 'object':
          formObject[item.name] = item.fields
            ? this.buildFormObject(item.fields as Field[])
            : {};
          break;

        case 'array':
          formObject[item.name] = item.fields
            ? item.fields.map((field) => this.buildFormObject([field as Field]))
            : [];
          break;

        default:
          if ('value' in item) {
            formObject[item.name] = (item as Field).value;
          }
          break;
      }
      return formObject;
    }, {});
  }

  submit() {
    console.log(this.schema); // Aqui você pode acessar os dados do formulário
    console.log(this.buildFormObject(this.schema.fields));
  }

  shouldShowField(field: Field, fields: Field[]): boolean {
    if (!field.conditional) return true;

    for (const f of fields) {
      if (f.name === field.conditional.field) {
        return true;
      }
    }

    return false;
  }
}
