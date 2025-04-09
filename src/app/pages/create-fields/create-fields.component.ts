import { Component } from '@angular/core';
import { FormSchema } from '../../components/custom-form/custom-form.component';
import { IaService } from '../../components/custom-form/services/ia.service';
import {
  formToProcess,
  schemaAlergias,
  schemaBase,
  schemaMedicamentos,
} from '../../components/custom-form/utils/base';
import {
  advancedSchema,
  complexSchema
} from '../../components/custom-form/utils/examples';

interface Schemas {
  schema: FormSchema;
  isRecursive: boolean;
  debug: boolean;
}

@Component({
  selector: 'app-create-fields',
  templateUrl: './create-fields.component.html',
  styleUrls: ['./create-fields.component.scss'],
})
export class CreateFieldsComponent {
  public schemas: Schemas[] = [
    // { schema: schemaBase, isRecursive: true, debug: true },
    // { schema: schemaAlergias, isRecursive: false, debug: true },
    // { schema: schemaMedicamentos, isRecursive: false, debug: true },
    // { schema: complexSchema, isRecursive: false, debug: false },
    // { schema: advancedSchema, isRecursive: false, debug: false },
  ];

  constructor(private readonly iaService: IaService) {}

  userInput: string = ''; // Texto digitado pelo usuário

  carregando = false; // Estado de carregamento

  enviarMensagem() {
    if (!this.userInput.trim()) return; // Evita enviar mensagens vazias

    const pergunta = this.userInput; // Salva o texto para enviar à IA
    this.userInput = ''; // Limpa o input
    this.carregando = true;

    this.iaService
      .processText(pergunta, JSON.stringify(formToProcess))
      .subscribe({
        next: (res) => {
          this.schemas.push({
            schema: res.schema,
            isRecursive: false,
            debug: true,
          });
          console.log(
            '🚀 ~ CreateFieldsComponent ~ enviarMensagem ~ this.schemas:',
            this.schemas
          );

          // Obter o schema retornado pela IA
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro ao chamar IA:', err);
          this.carregando = false;
        },
      });
  }
}
