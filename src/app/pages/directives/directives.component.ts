import { Component } from '@angular/core';

interface Cat {
  name: string;
  type: 'cat';
}

interface Dog {
  name: string;
  race: string;
  type: 'dog';
}

type Animal = Dog | Cat;

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent  {

  public animal: Animal = {
   name: 'name',
   race: 'race',
   type: 'dog'
  }

  constructor() { }

}
