import { Component } from '@angular/core';
import { ChatMessage } from './chat-message.model';
import { IaService } from './ia.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.scss'],
})
export class IaComponent {
  messages: ChatMessage[] =
    JSON.parse(localStorage.getItem('@ia-messages')!) || []; // Array para armazenar as mensagens
  userInput: string = ''; // Texto digitado pelo usuário
  carregando = false; // Estado de carregamento
  formulario: FormGroup = new FormGroup({}); // Formulário dinâmico
  schema: any; // Schema retornado pela IA

  constructor(private iaService: IaService, private _fb: FormBuilder) {}

  enviarMensagem() {
    if (!this.userInput.trim()) return; // Evita enviar mensagens vazias

    // Adiciona a mensagem do usuário ao chat
    this.messages.push({ role: 'user', content: this.userInput });

    const pergunta = this.userInput; // Salva o texto para enviar à IA
    this.userInput = ''; // Limpa o input
    this.carregando = true;

    this.iaService.processText(pergunta).subscribe({
      next: (res) => {
        const respostaIa = res.content;
        this.schema = res.schema;

        Object.keys(this.schema).forEach((formKey) => {
          const value = this.schema[formKey];

          if (
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === 'object'
          ) {
            const formArray = this._fb.array([]);

            value.forEach((groupItem, groupIndex) => {
              if (groupItem.fields && Array.isArray(groupItem.fields)) {
                const group = this._fb.group({});

                groupItem.fields.forEach((field: any) => {
                  const control = new FormControl(
                    field.value,
                    field.required ? Validators.required : null
                  );
                  group.addControl(field.name, control);

                  if (field.valueChanges) {
                    // 🔥 Configura o valueChanges para chamar onFieldChange corretamente
                    setTimeout(() => {
                      control.valueChanges.subscribe(() => {
                        this.onFieldChange(formKey, groupIndex, field.name);
                      });
                    }, 0);
                  }
                });

                formArray.push(group);
              }
            });

            this.formulario.addControl(formKey, formArray);
          }
        });

        // Adiciona a resposta da IA ao chat
        this.messages.push({ role: 'assistant', content: respostaIa });
        localStorage.setItem('@ia-messages', JSON.stringify(this.messages)); // Salva as mensagens no LocalStorage

        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao chamar IA:', err);
        this.carregando = false;
      },
    });
  }

  getSchemaKeys(): string[] {
    return Object.keys(this.schema);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value);
  }

  getFormArrayControls(key: string): AbstractControl[] {
    return (this.formulario.get(key) as FormArray)?.controls || [];
  }

  shouldShowField(formKey: string, groupIndex: number, field: any): boolean {
    if (!field.dependsOn) {
      return true; // Se não tiver dependência, exibe o campo normalmente.
    }

    const parentControl = this.getFormArrayControls(formKey)[groupIndex].get(
      field.dependsOn.field
    );
    return parentControl?.value === field.dependsOn.value;
  }

  // 🔹 Função para limpar campos dependentes
  onFieldChange(formKey: string, groupIndex: number, fieldName: string): void {
    const parentGroup = this.getFormArrayControls(formKey)[groupIndex];

    // 🔥 Encontrar todos os campos dependentes desse field
    const dependentFields = this.schema[formKey][groupIndex].fields.filter(
      (field: any) => field.dependsOn?.field === fieldName
    );

    // 🔥 Limpar os valores desses campos
    dependentFields.forEach((field: any) => {
      parentGroup.get(field.name)?.setValue('');
    });
  }
}
