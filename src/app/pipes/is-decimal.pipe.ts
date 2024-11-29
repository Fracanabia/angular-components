import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';

@Pipe({
  name: 'isDecimal',
})
export class IsDecimalPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) public locale: string) {}
  transform(
    value: number | string | null | undefined = 0
  ): number | string | null | undefined {
    let valueToTransform = value;
    if (!valueToTransform) {
      valueToTransform = 0;
    }
    if (typeof valueToTransform === 'string') {
      const numberParsed = Number(valueToTransform);

      if (isNaN(numberParsed)) {
        return valueToTransform;
      }

      return Intl.NumberFormat(this.locale || 'pt-BR', {
        minimumFractionDigits: 1,
      }).format(numberParsed);
    }

    if (typeof valueToTransform === 'number') {
      return Intl.NumberFormat(this.locale || 'pt-BR', {
        minimumFractionDigits: 1,
      }).format(valueToTransform);
    }

    return valueToTransform;
  }
}
