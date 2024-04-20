import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private readonly _themeService: ThemeService) {}
  isDarkMode: boolean | undefined;
  ngOnInit() {
    this._themeService.darkThemeOb.subscribe((theme) => (this.isDarkMode = theme));
  }
}
