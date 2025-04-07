import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
})
export class ChildrenComponent implements OnInit {
  @Input() observable!: (params: { search: string }) => Observable<any[]>;

  public search = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.observable({ search: this.search.value }).subscribe(console.log);

    // Exercício 2: Criar um formulário reativo com validação
    this.search?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.observable({ search: this.search.value }))
      )
      .subscribe(console.log);
  }
}
