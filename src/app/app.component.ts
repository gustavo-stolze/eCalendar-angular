import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getDays, getNextDays, getPrevDays } from './utils/dateGetters';
import { GetTasksService } from './services/get-tasks.service';
import { IItem } from './interfaces/item.interface';
import { NgForm } from '@angular/forms';
import { genKey } from './utils/genKey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isFormModalOpen: boolean = false;
  isFormModalEditting: boolean = false;
  edittingId: number | undefined;

  formTitle: string | undefined;
  formLocation: string | undefined;
  formDate: Date | undefined;
  formDescription: string | undefined;

  resetForm() {
    this.formTitle = undefined;
    this.formLocation = undefined;
    this.formDate = undefined;
    this.formDescription = undefined;
  }

  isModalOpen: boolean = false;
  animationDelayButton: boolean = false;
  isTasksLoading: boolean = true;

  selectedDate: Date = new Date();
  currentDate: Date = new Date();
  prevDays: number[] = getPrevDays(this.currentDate);
  days: number[] = getDays(this.currentDate);
  nextDays: number[] = getNextDays(this.currentDate);
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

  tasks: IItem[] | undefined;

  @ViewChild('previouslyModalGrid')
  elPreviouslyModalGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('currentModalGrid')
  elCurrentModalGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('nextModalGrid') elNextModalGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('elModal') elModal!: ElementRef<HTMLDivElement>;
  @ViewChild('elMainGrid') elMainGrid!: ElementRef<HTMLDivElement>;

  constructor(private readonly _tasksService: GetTasksService) {}

  ngOnInit(): void {
    this._tasksService.getTasks().subscribe((tasks) => {
      this.isTasksLoading = true;
      setTimeout(() => {
        this.tasks = tasks;
        this.isTasksLoading = false;
      }, 1000);
    });
  }

  getTasks(): IItem[] | undefined {
    let tasks = this.tasks?.filter(
      (task) =>
        task.date.getMonth() === this.selectedDate.getMonth() &&
        task.date.getFullYear() === this.selectedDate.getFullYear() &&
        task.date.getDate() === this.selectedDate.getDate()
    );
    if (tasks?.length === 0) tasks = undefined;
    console.log(tasks);
    return tasks;
  }

  dayClicked(day: number) {
    this.selectedDate = new Date(
      `${this.currentDate.getFullYear()}-${
        this.currentDate.getMonth() + 1
      }-${day}`
    );
  }
  handlePreviouslyMonth() {
    const newDate = this.currentDate;
    newDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = newDate;
    this.udpateDays();
  }
  resetDate() {
    this.currentDate = new Date();
    this.udpateDays();
  }
  handleNextMonth() {
    const newDate = this.currentDate;
    newDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = newDate;
    this.udpateDays();
  }
  checkToday(day: number): boolean {
    const nowDate = new Date();
    if (
      nowDate.getFullYear() !== this.currentDate.getFullYear() ||
      nowDate.getMonth() !== this.currentDate.getMonth()
    )
      return false;

    return day === nowDate.getDate();
  }
  checkSelectedDay(day: number): boolean {
    if (
      this.selectedDate.getFullYear() !== this.currentDate.getFullYear() ||
      this.selectedDate.getMonth() !== this.currentDate.getMonth()
    )
      return false;
    return day === this.selectedDate.getDate();
  }
  udpateDays(): void {
    this.days = getDays(this.currentDate);
    this.prevDays = getPrevDays(this.currentDate);
    this.nextDays = getNextDays(this.currentDate);
  }

  // modal

  openModal() {
    this.isModalOpen = true;
    this.elMainGrid.nativeElement.style.pointerEvents = 'none';
    setTimeout(() => {
      this.elModal.nativeElement.classList.add(
        'app-a-calendarGrid__enterModal'
      );
    }, 50);
    setTimeout(() => {
      this.elModal.nativeElement.classList.remove(
        'app-a-calendarGrid__enterModal'
      );
      this.elModal.nativeElement.style.bottom = '0%';
    }, 600);
  }
  closeModal() {
    this.elModal.nativeElement.classList.add('app-a-calendarGrid__exitModal');
    setTimeout(() => {
      this.elModal.nativeElement.classList.remove(
        'app-a-calendarGrid__exitModal'
      );
      this.isModalOpen = false;
      this.modalDate = new Date();
      this.elMainGrid.nativeElement.style.pointerEvents = 'all';
    }, 590);
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

  handleSelectedModalDate(mainMonth: string) {
    const monthNumber = this.monthList.findIndex(
      (month) => month === mainMonth
    );
    const date = new Date();
    date.setMonth(monthNumber);
    date.setFullYear(this.modalDate.getFullYear());
    this.currentDate = date;
    console.log(date, monthNumber);
    this.udpateDays();
    this.closeModal();
  }
  getCustomPreviouslyDays(mainMonth: string): number[] {
    const monthNumber = this.monthList.findIndex(
      (month) => month === mainMonth
    );
    const date = this.modalDate;
    date.setMonth(monthNumber);
    return getPrevDays(date);
  }
  getCustomDays(mainMonth: string): number[] {
    const monthNumber = this.monthList.findIndex(
      (month) => month === mainMonth
    );
    const date = this.modalDate;
    date.setMonth(monthNumber);
    return getDays(date);
  }
  // tasks

  handleOpenFormModal() {
    this.isFormModalOpen = true;
    this.formDate = this.selectedDate;
  }

  handleRequestForEdit(selectedTask: IItem) {
    this.isFormModalOpen = true;
    this.isFormModalEditting = true;
    this.edittingId = selectedTask.id;
    this.formTitle = selectedTask.title;
    this.formLocation = selectedTask.location;
    this.formDate = selectedTask.date;
    this.formDescription = selectedTask.description;
  }

  handleCancelForm() {
    this.isFormModalOpen = false;
    this.isFormModalEditting = false;
    this.resetForm();
  }

  handleDeleteTask(id: number) {
    this._tasksService.deleteTask(id);
  }
  handleAddTask() {
    if (
      !this.formTitle ||
      !this.formLocation ||
      !this.formDate ||
      !this.formDescription
    )
      return;
    this._tasksService.addTask({
      id: genKey(),
      title: this.formTitle,
      location: this.formLocation,
      date: this.formDate,
      description: this.formDescription,
    });
    this.resetForm();
    this.isFormModalOpen = false;
  }
  handleEditTask() {
    if (
      !this.formTitle ||
      !this.formLocation ||
      !this.formDate ||
      !this.formDescription ||
      !this.edittingId
    )
      return;
    this._tasksService.editTask(this.edittingId, {
      id: this.edittingId,
      title: this.formTitle,
      location: this.formLocation,
      date: this.formDate,
      description: this.formDescription,
    });
    this.isFormModalEditting = false;
    this.edittingId = undefined;
    this.resetForm();
    this.isFormModalOpen = false;
  }
}
