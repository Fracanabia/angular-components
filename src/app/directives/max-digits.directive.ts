import { Directive, HostListener, ElementRef, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

interface MaxDigitsOptions {
  integerLimit: number
  decimalLimit: number
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[maxDigits]',
})
export class MaxDigitsDirective {
  @Input() maxDigitsOptions: Partial<MaxDigitsOptions> = {
    integerLimit: 4,
    decimalLimit: 3
  };

  constructor(private readonly _elementRef: ElementRef, @Optional() private readonly ngControl: NgControl
  ) {}

  @HostListener('input')
  onInput() {
    const inputValue = this._elementRef.nativeElement.value;
    const {integerLimit = 4, decimalLimit=  3} = this.maxDigitsOptions

    if (!inputValue) {
      return;
    }

    if (Number.isInteger(Number(inputValue))) {
      const truncatedValue = inputValue.replace(/\D/g, '').length > integerLimit ? inputValue.toString().substring(0, integerLimit) : inputValue;
      this.ngControl && this.ngControl.control && this.ngControl.control.patchValue(truncatedValue);
      this._elementRef.nativeElement.value = truncatedValue;
    } else {
      const [integerValue, decimalValue] = inputValue.toString().split('.');
      const truncatedIntegerValue = integerValue.replace(/\D/g, '').length > integerLimit ? integerValue.toString().substring(0, integerLimit) : integerValue;
      const truncatedDecimalValue = decimalValue.replace(/\D/g, '').length > decimalLimit ? decimalValue.toString().substring(0, decimalLimit) : decimalValue;
      const truncatedValue = [truncatedIntegerValue, truncatedDecimalValue].join('.');
      this.ngControl && this.ngControl.control && this.ngControl.control.patchValue(truncatedValue);
      this._elementRef.nativeElement.value = truncatedValue;
    }
  }
}
