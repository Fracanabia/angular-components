import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MOCK } from './MOCK';

@Component({
  selector: 'app-reactive-form-grouped',
  templateUrl: './reactive-form-grouped.component.html',
  styleUrls: ['./reactive-form-grouped.component.scss']
})
export class ReactiveFormGroupedComponent implements OnInit, AfterViewInit {
  @ViewChildren('grouped')
  grouped!: ElementRef;

  formGroup!: FormGroup;

  numbers:string[] = []

  constructor(
    private readonly _formBuilder:FormBuilder
  ) { }
  
  ngAfterViewInit(): void {
    console.log(this.grouped);
    MOCK[0].listaItemColetaSinalVitalDTO.forEach((f, i) => {
      if(f.tpSinalVital === 'R')        {
          this.numbers.push(i.toString())
        }
    })
    
  }

  ngOnInit(): void {
    this.createForm()
    this.initializeForm()
  }

  

  createForm():void{
    this.formGroup = this._formBuilder.group({
      entities: this._formBuilder.array([])
    });
  }

  initializeForm():void{
    MOCK[0].listaItemColetaSinalVitalDTO.sort((a, b) =>   a.tpSinalVital === "R" ?
    a.nrOrdem - b.nrOrdem && a.tpSinalVital > b.tpSinalVital ? -1 : 1 :
    a.nrOrdem - b.nrOrdem).forEach((sinal, i) => {
      const group = this._formBuilder.group({
        ...sinal
      })
      group.addControl(String(i),new FormControl(sinal.vlValor))
      this.entitiesForm.push(group)
      console.log(this.entitiesForm)
    })
  }

  get entitiesForm():FormArray{
    return this.formGroup.get('entities') as FormArray
  }

  test(){
    console.log(this.formGroup);
    console.log(this.entitiesForm.controls);
    console.log(this.numbers);
    
  }

}
