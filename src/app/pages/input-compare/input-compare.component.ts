import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-compare',
  templateUrl: './input-compare.component.html',
  styleUrls: ['./input-compare.component.scss']
})
export class InputCompareComponent implements OnInit {

  public formGroup!: FormGroup;

  public passwordType = 'password'

  public passwordConfirmType = 'password'

  constructor(
    private readonly _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    },
    {
      validators: this.compare
    })
  }

  compare(group: AbstractControl){
    const password: string = group.get('password')?.value;
    const password_confirm: string = group.get('password_confirm')?.value;
    if (password.localeCompare(password_confirm) !== 0) {
        group.get('password_confirm')?.setErrors({ mismatch: true });
        return { mismatch: true };
    } else {
        return null;
    }
  }

}
