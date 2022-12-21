import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent implements OnInit {

  formGroup!: FormGroup
  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      option: 'date',
      frequency: [{value:'', disabled: true}],
      dateInitial: '',
      hourInitial: '',
      minuteInitial: '',
      dateFinal: [{value:'', disabled: true}],
      hourFinal: [{value:'', disabled: true}],
      minuteFinal: [{value:'', disabled: true}],
    })

    this.formGroup.get('option')?.valueChanges.subscribe({
      next: (option) => {
        if(option === 'frequency'){
          this.formGroup.get('frequency')?.enable()
          this.formGroup.get('dateInitial')?.disable()
          this.formGroup.get('hourInitial')?.disable()
          this.formGroup.get('minuteInitial')?.disable()
        }
        if(option === 'date'){
          this.formGroup.get('frequency')?.disable()
          this.formGroup.get('dateInitial')?.enable()
          this.formGroup.get('hourInitial')?.enable()
          this.formGroup.get('minuteInitial')?.enable()
        }
      }
    })
  }

}
