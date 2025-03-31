import { FormSchema, FormField } from "../custom-form.component";

export const schemaBase: FormSchema = {
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
      { name: 'required', label: 'Obrigatório', type: 'checkbox', value: false },
      { name: 'readonly', label: 'Somente Leitura', type: 'checkbox', value: false },
      { name: 'min', label: 'Mínimo', type: 'number', conditional: { field: 'type', value: 'number' } },
      { name: 'max', label: 'Máximo', type: 'number', conditional: { field: 'type', value: 'number' } },
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
  { name: 'value', label: 'Valor Padrão', type: 'text', conditional: { field: 'type', value: ['text', 'number', 'select', 'radio', 'checkbox'] } }
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

schemaBase.fields = baseFields;

export const schemaAlergias: FormSchema = {
  title: 'Alergias',
  fields: [
    {
      name: 'alergias',
      label: 'alergias',
      type: 'array',
      fields: [
        // 1 alergia
        {
          name: 'alergia',
          label: 'alergia',
          type: 'json',
          fields: [
            {
              name: 'tipo',
              label: 'Tipo',
              type: 'radio',
              options: [
                { value: 'alimento', label: 'alimento' },
                { value: 'medicamento', label: 'medicamento' },
                { value: 'outro', label: 'outro' },
              ],
              value: 'outro',
            },
            {
              name: 'alimento',
              label: 'alimento',
              type: 'text',
              conditional: {
                field: 'tipo',
                value: 'alimento',
                operator: '===',
              },
              value: '',
            },
            {
              name: 'medicamento',
              label: 'medicamento',
              type: 'text',
              conditional: {
                field: 'tipo',
                value: 'medicamento',
                operator: '===',
              },
              value: '',
            },
            {
              name: 'outro',
              label: 'Outro',
              type: 'text',
              conditional: { field: 'tipo', value: 'outro', operator: '===' },
              value: 'outro',
            },
            {
              name: 'descricao',
              label: 'Descrição',
              type: 'text',
              value: '',
            },
          ],
        },
        // 2 alergia
        {
          name: 'alergia',
          label: 'alergia',
          type: 'json',
          fields: [
            {
              name: 'tipo',
              label: 'Tipo',
              type: 'radio',
              options: [
                { value: 'alimento', label: 'alimento' },
                { value: 'medicamento', label: 'medicamento' },
                { value: 'outro', label: 'outro' },
              ],
              value: 'alimento',
            },
            {
              name: 'alimento',
              label: 'alimento',
              type: 'text',
              conditional: {
                field: 'tipo',
                value: 'alimento',
                operator: '===',
              },
              value: '',
            },
            {
              name: 'medicamento',
              label: 'medicamento',
              type: 'text',
              conditional: {
                field: 'tipo',
                value: 'medicamento',
                operator: '===',
              },
              value: '',
            },
            {
              name: 'outro',
              label: 'Outro',
              type: 'text',
              conditional: { field: 'tipo', value: 'outro', operator: '===' },
              value: '',
            },
            {
              name: 'descricao',
              label: 'Descrição',
              type: 'text',
              value: '',
            },
          ],
        },
      ],
    },
  ],
};

export const schemaMedicamentos: FormSchema = {
  title: 'Medicamentos',
  fields: [
    // {
    //   name: 'medicamentos',
    //   label: 'medicamentos',
    //   type: 'array',
    //   options: [],
    //   validations: {
    //     required: '',
    //     readonly: '',
    //     min: '',
    //     max: '',
    //     email: '',
    //     pattern: '',
    //   },
    //   conditional: {
    //     field: '',
    //     value: '',
    //     operator: '',
    //   },
    //   value: '',
    //   fields: [
    //     {
    //       name: 'medicamento',
    //       label: 'medicamento',
    //       type: 'json',
    //       options: [],
    //       validations: {
    //         required: '',
    //         readonly: '',
    //         min: '',
    //         max: '',
    //         email: '',
    //         pattern: '',
    //       },
    //       conditional: {
    //         field: '',
    //         value: '',
    //         operator: '',
    //       },
    //       value: '',
    //       fields: [
    //         {
    //           name: 'medicamento',
    //           label: 'medicamento',
    //           type: 'select',
    //           options: [
    //             {
    //               value: 'dipirona',
    //               label: 'dipirona',
    //             },
    //           ],
    //           validations: {
    //             required: '',
    //             readonly: '',
    //             min: '',
    //             max: '',
    //             email: '',
    //             pattern: '',
    //           },
    //           conditional: {
    //             field: '',
    //             value: '',
    //             operator: '',
    //           },
    //           value: '',
    //           fields: [],
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      name: 'medicamentos',
      label: 'medicamentos',
      type: 'array',
      fields: [
        {
          name: 'medicamento',
          label: 'medicamento',
          type: 'select',
          options: [
            {
              value: 'medicamento1',
              label: 'medicamento1',
            },
            {
              value: 'medicamento2',
              label: 'medicamento2',
            },
          ],
        },
      ],
    },
  ],
};
