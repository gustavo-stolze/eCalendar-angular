import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public darkThemeOb: Observable<boolean> = this.darkTheme.asObservable();
  setDarkTheme() {
    this.darkTheme.next(true);
  }
  setLightTheme() {
    this.darkTheme.next(false);
  }
}
