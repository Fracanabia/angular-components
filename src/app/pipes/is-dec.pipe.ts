import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';

@Pipe({
  name: 'IsDecPipe',
})
export class IsDecPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) public locale: string) {}
  transform(value: string) {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'));
    }

    return value as number;
  }
}
