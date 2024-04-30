import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toWeekDay',
})
export class ToWeekDayPipe implements PipeTransform {
  transform(value: number): string {
    const weekDays = [];
    weekDays[0] = 'Domingo'
    weekDays[1] = 'Segunda'
    weekDays[2] = 'Terça'
    weekDays[3] = 'Quarta'
    weekDays[4] = 'Quinta'
    weekDays[5] = 'Sexta'
    weekDays[6] = 'Sábado'

    return weekDays[value];
  }
}
