import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { schemaFormFields } from './base';

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
    readonly?: boolean;
    required?: boolean;
    min?: number;
    max?: number;
    email?: boolean;
    pattern?: string;
  };
  conditional?: {
    field: string;
    value: any;
    operator?: '===' | '!==' | '>' | '<' | '>=' | '<=';
  };
  value?: any;
}

const complexSchema: FormSchema = {
  title: 'Cadastro Multi-Nível',
  fields: [
    {
      name: 'personalInfo',
      label: 'Informações Pessoais',
      type: 'json',
      fields: [
        {
          name: 'name',
          label: 'Nome Completo',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'contact',
          label: 'Contato',
          type: 'json',
          fields: [
            {
              name: 'email',
              label: 'E-mail',
              type: 'text',
              validations: { required: true },
            },
            {
              name: 'phone',
              label: 'Telefone',
              type: 'text',
              validations: { required: true },
            },
            {
              name: 'address',
              label: 'Endereço',
              type: 'json',
              fields: [
                {
                  name: 'street',
                  label: 'Rua',
                  type: 'text',
                  validations: { required: true },
                },
                {
                  name: 'number',
                  label: 'Número',
                  type: 'number',
                  validations: { required: true },
                },
                {
                  name: 'location',
                  label: 'Localização',
                  type: 'json',
                  fields: [
                    {
                      name: 'city',
                      label: 'Cidade',
                      type: 'text',
                      validations: { required: true },
                    },
                    {
                      name: 'state',
                      label: 'Estado',
                      type: 'text',
                      validations: { required: true },
                    },
                    {
                      name: 'country',
                      label: 'País',
                      type: 'text',
                      validations: { required: true },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const advancedSchema: FormSchema = {
  title: 'Cadastro Avançado',
  fields: [
    {
      name: 'basicInfo',
      label: 'Informações Básicas',
      type: 'json',
      fields: [
        {
          name: 'fullName',
          label: 'Nome Completo',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'age',
          label: 'Idade',
          type: 'number',
          validations: { required: true, min: 0 },
        },
        {
          name: 'gender',
          label: 'Gênero',
          type: 'select',
          options: [
            { label: 'Masculino', value: 'male' },
            { label: 'Feminino', value: 'female' },
            { label: 'Outro', value: 'other' },
          ],
          validations: { required: true },
        },
        {
          name: 'customGender',
          label: 'Especifique seu Gênero',
          type: 'text',
          conditional: { field: 'gender', value: 'other' },
        },
      ],
    },
    {
      name: 'contacts',
      label: 'Contatos',
      type: 'json',
      fields: [
        {
          name: 'email',
          label: 'E-mail',
          type: 'text',
          validations: { required: true, email: true },
        },
        {
          name: 'phones',
          label: 'Telefones',
          type: 'array',
          fields: [
            {
              name: 'type',
              label: 'Tipo',
              type: 'select',
              options: [
                { label: 'Celular', value: 'mobile' },
                { label: 'Residencial', value: 'home' },
                { label: 'Trabalho', value: 'work' },
              ],
              validations: { required: true },
            },
            {
              name: 'number',
              label: 'Número',
              type: 'text',
              validations: { required: true, pattern: '^[0-9]+$' },
            },
          ],
        },
      ],
    },
    {
      name: 'address',
      label: 'Endereço',
      type: 'json',
      fields: [
        {
          name: 'street',
          label: 'Rua',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'number',
          label: 'Número',
          type: 'number',
          validations: { required: true },
        },
        {
          name: 'zipcode',
          label: 'CEP',
          type: 'text',
          validations: { required: true, pattern: '^[0-9]{5}-[0-9]{3}$' },
        },
        {
          name: 'details',
          label: 'Detalhes',
          type: 'json',
          fields: [
            {
              name: 'complement',
              label: 'Complemento',
              type: 'text',
            },
            {
              name: 'neighborhood',
              label: 'Bairro',
              type: 'text',
            },
            {
              name: 'coordinates',
              label: 'Coordenadas',
              type: 'json',
              fields: [
                {
                  name: 'latitude',
                  label: 'Latitude',
                  type: 'number',
                  validations: { required: true },
                },
                {
                  name: 'longitude',
                  label: 'Longitude',
                  type: 'number',
                  validations: { required: true },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'familyMembers',
      label: 'Membros da Família',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'relationship',
          label: 'Parentesco',
          type: 'select',
          options: [
            { label: 'Pai', value: 'father' },
            { label: 'Mãe', value: 'mother' },
            { label: 'Irmão(ã)', value: 'sibling' },
            { label: 'Filho(a)', value: 'child' },
            { label: 'Outro', value: 'other' },
          ],
          validations: { required: true },
        },

        {
          name: 'additionalInfo',
          label: 'Informações Adicionais',
          type: 'json',
          fields: [
            {
              name: 'job',
              label: 'Trabalho',
              type: 'json',
              fields: [
                {
                  name: 'company',
                  label: 'Empresa',
                  type: 'text',
                },
                {
                  name: 'position',
                  label: 'Cargo',
                  type: 'text',
                },
              ],
            },
            {
              name: 'hobbies',
              label: 'Hobbies',
              type: 'array',
              fields: [
                {
                  name: 'hobby',
                  label: 'Hobby',
                  type: 'text',
                },
                {
                  name: 'frequency',
                  label: 'Frequência',
                  type: 'select',
                  options: [
                    { label: 'Diário', value: 'daily' },
                    { label: 'Semanal', value: 'weekly' },
                    { label: 'Mensal', value: 'monthly' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'preferences',
      label: 'Preferências',
      type: 'json',
      fields: [
        {
          name: 'contactMethod',
          label: 'Método de Contato Preferido',
          type: 'radio',
          options: [
            { label: 'E-mail', value: 'email' },
            { label: 'Telefone', value: 'phone' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
          validations: { required: true },
        },
        {
          name: 'newsletter',
          label: 'Receber Newsletter',
          type: 'checkbox',
        },
        {
          name: 'notificationSettings',
          label: 'Configurações de Notificação',
          type: 'json',
          fields: [
            {
              name: 'emailNotifications',
              label: 'Notificações por E-mail',
              type: 'checkbox',
            },
            {
              name: 'smsNotifications',
              label: 'Notificações por SMS',
              type: 'checkbox',
            },
            {
              name: 'appNotifications',
              label: 'Notificações no App',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
  ],
};

const errorSchema: FormSchema = {
  title: '',
  fields: [
    {
      name: 'familyMembers',
      label: 'Membros da Família',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'relationship',
          label: 'Parentesco',
          type: 'select',
          options: [
            { label: 'Pai', value: 'father' },
            { label: 'Mãe', value: 'mother' },
            { label: 'Irmão(ã)', value: 'sibling' },
            { label: 'Filho(a)', value: 'child' },
            { label: 'Outro', value: 'other' },
          ],
          validations: { required: true },
        },

        {
          name: 'additionalInfo',
          label: 'Informações Adicionais',
          type: 'json',
          fields: [
            {
              name: 'job',
              label: 'Trabalho',
              type: 'json',
              fields: [
                {
                  name: 'company',
                  label: 'Empresa',
                  type: 'text',
                },
                {
                  name: 'position',
                  label: 'Cargo',
                  type: 'text',
                },
              ],
            },
            {
              name: 'hobbies',
              label: 'Hobbies',
              type: 'array',
              fields: [
                {
                  name: 'hobby',
                  label: 'Hobby',
                  type: 'text',
                },
                {
                  name: 'frequency',
                  label: 'Frequência',
                  type: 'select',
                  options: [
                    { label: 'Diário', value: 'daily' },
                    { label: 'Semanal', value: 'weekly' },
                    { label: 'Mensal', value: 'monthly' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const schema: FormSchema = {
  title: 'Cadastro Familiar',
  fields: [
    {
      name: 'familyType',
      label: 'Tipo de Família',
      type: 'radio',
      options: [
        { label: 'Nuclear', value: 'nuclear' },
        { label: 'Extensa', value: 'extensa' },
      ],
      validations: { required: true },
    },
    {
      name: 'grandparents',
      label: 'Nome dos Avós',
      type: 'text',
      conditional: { field: 'familyType', value: 'extensa' },
    },
    {
      name: 'parents',
      label: 'Pais',
      type: 'json',
      fields: [
        {
          name: 'father',
          label: 'Nome do Pai',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'mother',
          label: 'Nome da Mãe',
          type: 'text',
          validations: { required: true },
        },
      ],
    },
    {
      name: 'children',
      label: 'Filhos',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
          validations: { required: true },
        },
        {
          name: 'age',
          label: 'Idade',
          type: 'number',
          validations: { required: true },
        },
        {
          name: 'address',
          label: 'Endereço',
          type: 'json',
          fields: [
            {
              name: 'street',
              label: 'Rua',
              type: 'text',
              validations: { required: true },
            },
            {
              name: 'number',
              label: 'Número',
              type: 'number',
              validations: { required: true },
            },
          ],
        },
        {
          name: 'addressArray',
          label: 'Endereço Array',
          type: 'array',
          fields: [
            {
              name: 'street',
              label: 'Rua',
              type: 'text',
              validations: { required: true },
            },
            {
              name: 'number',
              label: 'Número',
              type: 'number',
              validations: { required: true },
            },
          ],
        },
      ],
    },
  ],
};

const schemaTest: FormSchema = {
  title: 'Teste',
  fields: [
    {
      name: 'alergias',
      label: 'Alergias',
      type: 'json',
      options: [],
      value: '',
      fields: [
        {
          name: 'tipo',
          label: 'Tipo',
          type: 'radio',
          options: [
            {
              value: 'alimento',
              label: 'Alimento',
            },
            {
              value: 'medicamento',
              label: 'Medicamento',
            },
          ],
          value: '',
          fields: [],
        },
        {
          name: 'alimento',
          label: 'Alimento',
          type: 'text',
          options: [],
          conditional: {
            field: 'tipo',
            value: 'alimento',
          },
          value: '',
          fields: [],
        },
        {
          name: 'medicamento',
          label: 'Medicamento',
          type: 'text',
          options: [],
          conditional: {
            field: 'tipo',
            value: 'medicamento',
          },
          value: '',
          fields: [],
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent implements OnInit {
  @Input() schema: FormSchema = advancedSchema;
  // @Input() schema: FormSchema = schemaFormFields;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createFormGroup(this.schema.fields);
    this.setupConditionalFields();
    this.form.valueChanges.subscribe(() => {
      console.log('Form Data:', JSON.stringify(this.form.value, null, 2));
    });
  }

  setupConditionalFields(): void {
    this.schema.fields.forEach((field) => {
      if (field.conditional) {
        this.form.get(field.conditional.field)?.valueChanges.subscribe(() => {
          this.form.updateValueAndValidity();
        });
      }
    });
  }

  createFormGroup(fields: FormField[]): FormGroup {
    const group: { [key: string]: AbstractControl } = {};

    fields.forEach((field) => {
      if (field.type === 'json') {
        group[field.name] = this.createFormGroup(field.fields || []);
      } else if (field.type === 'array') {
        // Criando um FormArray
        const formArray = this.fb.array([]);

        // Criando um FormArray com um valor inicial preenchido
        // const formArray = this.fb.array([
        //   this.createFormGroup(field.fields || [])
        // ]);

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
}
