import { FormSchema, FormField } from "./custom-form.component";

export const schemaFormFields: FormSchema = {
  title: 'Criar seu Formulário Personalizado',
  fields: []
};

const baseFields: FormField[] = [
  { name: 'name', label: 'Nome do Campo', type: 'text', validations: { required: true } },
  { name: 'label', label: 'Label', type: 'text', validations: { required: true } },
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
      { label: 'Array', value: 'array' }
    ],
    validations: { required: true }
  },
  {
    name: 'options',
    label: 'Opções (Para Select/Radio/Checkbox)',
    type: 'array',
    conditional: { field: 'type', value: ['select', 'radio', 'checkbox'] },
    fields: [
      { name: 'value', label: 'Valor', type: 'text', validations: { required: true } },
      { name: 'label', label: 'Label', type: 'text', validations: { required: true } }
    ]
  },
  {
    name: 'validations',
    label: 'Validações',
    type: 'json',
    conditional: { field: 'type', value: ['text', 'number', 'select', 'radio', 'checkbox'] },
    fields: [
      { name: 'required', label: 'Obrigatório', type: 'checkbox' },
      { name: 'readonly', label: 'Somente Leitura', type: 'checkbox' },
      { name: 'min', label: 'Mínimo', type: 'number' },
      { name: 'max', label: 'Máximo', type: 'number' },
      { name: 'email', label: 'Validação de Email', type: 'checkbox' },
      { name: 'pattern', label: 'Regex Pattern', type: 'text' }
    ]
  },
  {
    name: 'conditional',
    label: 'Condição de Exibição',
    type: 'json',
    conditional: { field: 'type', value: ['text', 'number', 'select', 'radio', 'checkbox'] },
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
          { label: '<=', value: '<=' }
        ]
      }
    ]
  },
  { name: 'value', label: 'Valor Padrão', type: 'text' }
];

baseFields.push({
  name: 'fields',
  label: 'JSON',
  type: 'array',
  conditional: { field: 'type', value: 'json' },
  fields: baseFields
});

baseFields.push({
  name: 'fields',
  label: 'ARRAY',
  type: 'array',
  conditional: { field: 'type', value: 'array' },
  fields: baseFields
});

schemaFormFields.fields = baseFields;
