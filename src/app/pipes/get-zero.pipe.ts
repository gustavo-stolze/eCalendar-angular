import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getZero',
})
export class GetZeroPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 9) return value.toString();
    return `0${value}`;
  }
}
