import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent {
  inputValueNgModel = 2;
  inputValuePure = 2;
  inputValueFormGroup = 2;
  formGroup!: FormGroup;

  special: '.' | ',' | ['.', ','] = ',';

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      number: ['2,1', [this.maiorQueZeroValidator]]
    });
  }

  maiorQueZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valor = control.value;
      console.log("🚀 ~ file: input-number.component.ts:26 ~ InputNumberComponent ~ return ~ valor:", valor)

      if (valor !== null && valor !== undefined && isNaN(valor)) {
        // Se não for um número, retorna um erro
        return { 'maiorQueZero': true };
      }

      // Se for um número maior que zero, retorna null (sem erro)
      return valor > 0 ? null : { 'maiorQueZero': true };
    };
  }

  validatorIntegerDecimalLimit(integer: number, decimal: number){
    const integerLimit = `\\d{1,${integer}}`
    const decimalLimit = `\\d{0,${decimal}}`
    const regex = new RegExp(`^-?${integerLimit}(?:[.,]${decimalLimit})?$`)
    return regex
  }

  change(event:any) {
    const target = event.target as HTMLInputElement;
    this.inputValuePure = Number(target.value);
  }

  pure(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    this.inputValuePure = Number(target.value);
  }

  withNgModel(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    this.inputValueNgModel = Number(target.value);
  }

  withFormGroup(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    this.inputValueFormGroup = Number(target.value);
  }

}
