import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldSchema, SimpleFormService } from './simple-form.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent implements OnInit {
  public formGroup = new FormGroup({});

  @Input() public schema: FieldSchema[] = [];

  @Input() public data = {};

  constructor(private readonly _simpleFormService: SimpleFormService) {}

  ngOnInit(): void {
    this.formGroup = this._simpleFormService.buildForm(this.schema, this.data, {
      newItem: false,
    });
  }

  get form() {
    return this.formGroup;
  }

  sanitizeObject(obj: any): any {
    if (Array.isArray(obj)) {
      const sanitizedArray = obj
        .map((item) => this.sanitizeObject(item))
        .filter((item) => item !== undefined);
      return sanitizedArray.length > 0 ? sanitizedArray : undefined;
    }

    if (obj && typeof obj === 'object') {
      const sanitizedObj = Object.entries(obj).reduce((acc, [key, value]) => {
        const sanitizedValue = this.sanitizeObject(value);
        if (sanitizedValue !== undefined) {
          acc[key] = sanitizedValue;
        }
        return acc;
      }, {} as any);
      return Object.keys(sanitizedObj).length > 0 ? sanitizedObj : undefined;
    }

    return obj === '' ? undefined : obj;
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
