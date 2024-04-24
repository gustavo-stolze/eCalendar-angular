import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { tasksMock } from '../mock/tasks';

@Injectable({
  providedIn: 'root',
})
export class GetTasksService {
  getTasks(): Observable<IItem[]> {
    delay(1000)
    return of(tasksMock);
  }
}
