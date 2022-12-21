import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export const isDog = (animal: Animal): animal is Dog => {
  return (animal as Dog).race !== undefined;
}

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

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[isDog]'
})
export class IsDogDirective {

  @Input('isDog') set isDogInput(animal: Animal) {
    if (isDog(animal)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>
  ) {}

  static ngTemplateGuard_isDog(
    _dir: IsDogDirective, // class name
    state: Animal // input type
  ): state is Dog { // output type
    return true;
  }

}
