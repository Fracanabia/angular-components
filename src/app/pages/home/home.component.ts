import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  FieldSchema
} from '../../components/simple-form/simple-form.service';
import { SimpleFormComponent } from './../../components/simple-form/simple-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  schema: FieldSchema[] = [
    {
      name: 'medicamentos',
      label: 'Medicamentos',
      type: 'array',
      options: [],
      validations: {
        required: false,
        readonly: false,
        min: '',
        max: '',
        email: '',
        pattern: '',
      },
      conditional: {
        field: '',
        value: '',
        operator: '',
      },
      value: '',
      fields: [
        {
          name: 'tipo',
          label: 'tipo',
          type: 'radio',
          options: [
            {
              value: 'alimento',
              label: 'Alimento',
            },
            {
              value: 'substancia',
              label: 'Substancia',
            },
            {
              value: 'outro',
              label: 'Outro',
            },
          ],
          validations: {
            required: true,
            readonly: '',
            min: '',
            max: '',
            email: '',
            pattern: '',
          },
          conditional: {
            field: '',
            value: '',
            operator: '',
          },
          value: '',
          fields: [],
        },
        {
          name: 'severidade',
          label: 'Severidade',
          type: 'select',
          options: [
            { value: 'leve', label: 'Leve' },
            { value: 'moderado', label: 'Moderado' },
            { value: 'grave', label: 'Grave' },
            { value: 'desconhecido', label: 'Desconhecido' },
          ],
          value: '',
          validations: {
            required: true,
          },
        },
        {
          name: 'alimento',
          label: 'Alimento',
          type: 'text',
          options: [],
          validations: {
            required: '',
            readonly: '',
            min: '',
            max: '',
            email: '',
            pattern: '',
          },
          conditional: {
            field: 'tipo',
            value: 'alimento',
            operator: '===',
          },
          value: '',
          fields: [],
        },
        {
          name: 'substancia',
          label: 'Substancia',
          type: 'text',
          options: [],
          validations: {
            required: '',
            readonly: '',
            min: '',
            max: '',
            email: '',
            pattern: '',
          },
          conditional: {
            field: 'tipo',
            value: 'substancia',
            operator: '===',
          },
          value: '',
          fields: [],
        },
        {
          name: 'descricao',
          label: 'Descrição',
          type: 'text',
          options: [],
          validations: {
            required: '',
            readonly: '',
            min: '',
            max: '',
            email: '',
            pattern: '',
          },
          conditional: {
            field: 'tipo',
            value: 'outro',
            operator: '===',
          },
          value: '',
          fields: [],
        },
        {
          name: 'observacao',
          label: 'Observação',
          type: 'text',
          options: [],
          validations: {
            required: '',
            readonly: '',
            min: '',
            max: '',
            email: '',
            pattern: '',
          },
          conditional: {
            field: '',
            value: '',
            operator: '',
          },
          value: '',
          fields: [],
        },
      ],
    },
  ];

  data = {};

  @ViewChild(SimpleFormComponent) simpleFormComponent!: SimpleFormComponent;

  constructor() {}

  ngAfterViewInit(): void {
    console.log({
      schema: this.simpleFormComponent.schema,
      form: this.simpleFormComponent.form.value,
    });
  }

  save() {
    console.log(
      '🚀 ~ HomeComponent ~ save ~ this.simpleFormComponent.formGroup:',
      this.simpleFormComponent.formGroup
    );
    this.simpleFormComponent.formGroup.markAllAsTouched();
  }
}
