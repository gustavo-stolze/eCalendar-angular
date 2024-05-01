import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToMonthPipe } from './pipes/to-month.pipe';
import { FormsModule } from '@angular/forms';
import { ToWeekDayPipe } from './pipes/to-week-day.pipe';
import { GetZeroPipe } from './pipes/get-zero.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ToMonthPipe, ToWeekDayPipe, GetZeroPipe],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    BrowserAnimationsModule
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
