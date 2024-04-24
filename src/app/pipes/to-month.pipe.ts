import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMonth',
})
export class ToMonthPipe implements PipeTransform {
  transform(monthNumber: number): string {
    const monthArray = [];
    monthArray[0] = 'Janeiro';
    monthArray[1] = 'Fevereiro';
    monthArray[2] = 'Março';
    monthArray[3] = 'Abril';
    monthArray[4] = 'Maio';
    monthArray[5] = 'Junho';
    monthArray[6] = 'Julho';
    monthArray[7] = 'Agosto';
    monthArray[8] = 'Setembro';
    monthArray[9] = 'Outubro';
    monthArray[10] = 'Novembro';
    monthArray[11] = 'Dezembro';
    return `${monthArray[monthNumber]}`;
  }
}
