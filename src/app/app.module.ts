import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToMonthPipe } from './pipes/to-month.pipe';
import { FormsModule } from '@angular/forms';
import { ToWeekDayPipe } from './pipes/to-week-day.pipe';
import { GetZeroPipe } from './pipes/get-zero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToMonthPipe,
    ToWeekDayPipe,
    GetZeroPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
