import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

interface IsDecimalOptions {
  allowNegative: boolean;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[isDecimal]',
})
export class IsDecimalDirective {
  @Input() isDecimalOptions: Partial<IsDecimalOptions> = {
    allowNegative: false,
  };

  private previousValue = '';

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly renderer2: Renderer2,
    @Optional() private readonly ngControl: NgControl
  ) {
    const input = this.elementRef.nativeElement;
    input.type = 'number';
    this.renderer2.addClass(this.elementRef.nativeElement, 'number-spin');
  }

  @HostListener('keydown', ['$event'])
  onValidNumericInput(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const blockedKeys = ['e', '+'];


    if (!this.isDecimalOptions.allowNegative) {
      blockedKeys.push('-');
    }

    if (blockedKeys.includes(key)) {
      event.preventDefault();
    }

  }
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    if (this.previousValue === target.value) {
      return;
    }

    this.previousValue = target.value;

    let parseNumber = parseFloat(target.value);
    if (isNaN(parseNumber)) {
      return;
    }

    let formattedNumber = parseNumber.toString();

    if (!this.isDecimalOptions.allowNegative) {
      formattedNumber = Math.abs(parseNumber).toString();
    }

    this.elementRef.nativeElement.setAttribute('value', formattedNumber);

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.patchValue(formattedNumber, { emitEvent: false});
    }

    this.setCursorToEnd();
  }

  private setCursorToEnd() {
    const input = this.elementRef.nativeElement;
    input.type = 'text';
    input.setSelectionRange(input.value.length, input.value.length);
    input.type = 'number';
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: Event) {
    event.preventDefault();
  }
}
