import { Component, ElementRef, ViewChild } from '@angular/core';
import { getDays, getNextDays, getPrevDays } from './utils/dateGetters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isModalOpen: boolean = false;
  animationDelayButton: boolean = false;

  selectedDate: Date = new Date();
  prevDays: number[] = getPrevDays(this.selectedDate);
  days: number[] = getDays(this.selectedDate);
  nextDays: number[] = getNextDays(this.selectedDate);
  modalDate: Date = new Date();
  monthList: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  @ViewChild('previouslyModalGrid')
  elPreviouslyModalGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('currentModalGrid')
  elCurrentModalGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('nextModalGrid') elNextModalGrid!: ElementRef<HTMLDivElement>;

  dayClicked(day: number) {
    console.log(
      new Date(
        `${this.selectedDate.getFullYear()}-${
          this.selectedDate.getMonth() + 1
        }-${day}`
      )
    );
  }
  handlePreviouslyMonth() {
    const newDate = this.selectedDate;
    newDate.setMonth(this.selectedDate.getMonth() - 1);
    this.selectedDate = newDate;
    this.udpateDays();
  }
  resetDate() {
    this.selectedDate = new Date();
    this.udpateDays();
  }
  handleNextMonth() {
    const newDate = this.selectedDate;
    newDate.setMonth(this.selectedDate.getMonth() + 1);
    this.selectedDate = newDate;
    this.udpateDays();
  }
  udpateDays(): void {
    this.days = getDays(this.selectedDate);
    this.prevDays = getPrevDays(this.selectedDate);
    this.nextDays = getNextDays(this.selectedDate);
  }

  // modal

  openModal() {
    this.isModalOpen = true;
  }
  handleModalPreviouslyYear() {
    this.elCurrentModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__back-current'
    );
    this.elPreviouslyModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__back-previously'
    );
    this.animationDelayButton = true;

    setTimeout(() => {
      this.elCurrentModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__back-current'
      );
      this.elPreviouslyModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__back-previously'
      );
      this.animationDelayButton = false;
    }, 600);

    const newDate = this.modalDate;
    newDate.setFullYear(this.modalDate.getFullYear() - 1);
    this.modalDate = newDate;
  }
  handleModalNextYear() {
    this.elCurrentModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__next-current'
    );
    this.elNextModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__next-next'
    );
    this.animationDelayButton = true;

    setTimeout(() => {
      this.elCurrentModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__next-current'
      );
      this.elNextModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__next-next'
      );
      this.animationDelayButton = false;
    }, 600);

    const newDate = this.modalDate;
    newDate.setFullYear(this.modalDate.getFullYear() + 1);
    this.modalDate = newDate;
  }

  resetModalDate() {
    const newDate = new Date();
  if (newDate.getFullYear() < this.modalDate.getFullYear()) {
    this.modalDate = newDate;
    this.elCurrentModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__back-current'
    );
    this.elPreviouslyModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__back-previously'
    );
    this.animationDelayButton = true;

    setTimeout(() => {
      this.elCurrentModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__back-current'
      );
      this.elPreviouslyModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__back-previously'
      );
      this.animationDelayButton = false;
    }, 600);
  } else if (newDate.getFullYear() > this.modalDate.getFullYear()) {
    this.modalDate = newDate;
    this.elCurrentModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__next-current'
    );
    this.elNextModalGrid.nativeElement.classList.add(
      'app-a-calendarGrid__next-next'
    );
    this.animationDelayButton = true;

    setTimeout(() => {
      this.elCurrentModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__next-current'
      );
      this.elNextModalGrid.nativeElement.classList.remove(
        'app-a-calendarGrid__next-next'
      );
      this.animationDelayButton = false;
    }, 600);
  }
  }

  closeModal() {
    this.isModalOpen = false;
  }
  getCustomDays(mainMonth: string): number[] {
    const monthNumber = this.monthList.findIndex(
      (month) => month === mainMonth
    );
    const date = this.modalDate;
    date.setMonth(monthNumber);
    return getDays(date);
  }
}
