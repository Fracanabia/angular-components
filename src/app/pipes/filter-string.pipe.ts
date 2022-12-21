import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterString'
})
export class FilterStringPipe implements PipeTransform {

  transform(values: string[], search: string = ''): string[] {
    if(!search){
      return values
    }
    return values.filter(value => value.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
