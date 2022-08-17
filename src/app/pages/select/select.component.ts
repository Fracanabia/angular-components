import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  public items:any[] = []

  public formGroup!: FormGroup;

  constructor(

    private readonly _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.items = [
      {id: 1, title: 'um'},
      {id: 2, title: 'dois'},
      {id: 3, title: 'tres'},
    ]
    
    this.formGroup = this._formBuilder.group({
      select: ['', Validators.required]
    })

    if(this.items.length)
    this.formGroup.get('select')?.setValue(this.items[0])
  }


  test2(items1:any, items2:any){
    return  items1.id === items2.id
  }



}
