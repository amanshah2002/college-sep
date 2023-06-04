import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: any): string {
    let firstLetter = value.split('')[0];
    return firstLetter;
  }

}
