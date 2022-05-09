import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MOCK } from './MOCK';

@Component({
  selector: 'app-reactive-form-grouped',
  templateUrl: './reactive-form-grouped.component.html',
  styleUrls: ['./reactive-form-grouped.component.scss']
})
export class ReactiveFormGroupedComponent implements OnInit {

  formGroup!: FormGroup;

  numbers:number[] = []

  constructor(
    private readonly _formBuilder:FormBuilder
  ) { }
  
 

  ngOnInit(): void {
    this.createForm()
    this.initializeForm()
  }

 
  mustGroup(){
    return this.entitiesForm.controls.filter(form => form.value.tpSinalVital === 'R').length >= 2
  }

  createForm():void{
    this.formGroup = this._formBuilder.group({
      entities: this._formBuilder.array([])
    });
  }

  // PODE SER FEITO PARA ATUALIZAR O VALOR DE OUTROS SELECTS
  changeValues(group:FormGroup){
    group.get('select')?.valueChanges.subscribe({
      next: (value) => {
       this.entitiesForm.controls.forEach(form => {
         if (form.value.tpSinalVital === 'R'){
           this.entitiesForm.setValue(value)
         }
       })
      }
    })
  }

  initializeForm():void{
    MOCK[0].listaItemColetaSinalVitalDTO.sort((a, b) =>   a.tpSinalVital === "R" ?
    a.nrOrdem - b.nrOrdem && a.tpSinalVital > b.tpSinalVital ? -1 : 1 :
    a.nrOrdem - b.nrOrdem).forEach(sinal => {
      const group = this._formBuilder.group({
        ...sinal,
      })
      this.entitiesForm.push(group)
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
