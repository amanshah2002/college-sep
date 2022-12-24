import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCase',
})
export class WordCasePipe implements PipeTransform {
  transform(value: string): string {
    const valueArray = value.split('');
    valueArray[0] = valueArray[0].toUpperCase();
    value = valueArray.join('');

    return value;
  }
}
