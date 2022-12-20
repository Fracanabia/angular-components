import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, delay } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  private _fakeItemList = new BehaviorSubject([
    {id: 1, title: 'um'},
    {id: 2, title: 'dois'},
    {id: 3, title: 'tres'},
  ])

  private _fakeItemSelected = new BehaviorSubject(
    {id: 3, title: 'tres'},
  )

  public items:any[] = []

  public formGroup!: FormGroup;

  constructor(

    private readonly _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      select: ['', Validators.required]
    })

    this._fakeItemList.pipe(delay(1500)).subscribe({
      next: (items) => this.items = items
    });

    this._fakeItemSelected.pipe(delay(1500)).subscribe({
      next: (item) => this.formGroup.get('select')?.setValue(item)
    })

  }

  compareFn(item1:any, item2:any){
    return item1?.id === item2?.id
  }
}
