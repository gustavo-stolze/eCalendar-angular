import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { tasksMock } from '../mock/tasks';

@Injectable({
  providedIn: 'root',
})
export class GetTasksService {
  private itemList: BehaviorSubject<IItem[]> = new BehaviorSubject(tasksMock);
  getTasks(): Observable<IItem[]> {
    return this.itemList.asObservable();
  }
  addTask(task: IItem) {
    const list = this.itemList.getValue();
    list.push(task);
    this.itemList.next(list);
  }
  editTask(id: number, editedTask: IItem) {
    const list = this.itemList.getValue();
    const wantedItem = list.find((task) => task.id === id);
    if (!wantedItem) return;
    const index = list.indexOf(wantedItem);
    list[index] = { ...list[index], ...editedTask }
    this.itemList.next(list);
  }
  deleteTask(id: number): void {
    const list = this.itemList.getValue();
    const wantedItem = list.find((task) => task.id === id);
    if (!wantedItem) return;
    const index = list.indexOf(wantedItem);
    list.splice(index, 1);
    this.itemList.next(list);
  }
}
