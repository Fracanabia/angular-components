import { Component, OnInit } from '@angular/core';
import { MOCK_INFO } from './MOCK_INFO';

@Component({
  selector: 'app-checagem',
  templateUrl: './checagem.component.html',
  styleUrls: ['./checagem.component.scss']
})
export class ChecagemComponent implements OnInit {

  info: any

  headerGrouped:any[] = []

  headerNavigation:string[] = []

  mtxChecagemRendererBean: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.info = MOCK_INFO

    this.info.mtxChecagemRendererBean.forEach((value:any) => value.forEach((value:any) => {
      if(!this.headerGrouped.some(item => item.cdPrescricaoMedica === value.cdPrescricaoMedica)){
        this.headerGrouped.push(value)
      }
    }));

    this.headerNavigation = this.info.mtxChecagemRendererBean[0].map((value:any) => value.dhHeader)
    this.mtxChecagemRendererBean = this.info.mtxChecagemRendererBean
    
    console.log("🚀 - this.headerGrouped", this.headerGrouped)
    console.log("🚀 - this.headerNavigation", this.headerNavigation)
    console.log("🚀 - this.mtxChecagemRendererBean", this.mtxChecagemRendererBean)
  }

}
