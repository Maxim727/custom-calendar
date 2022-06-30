import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { InfinScrollComponent } from './components/infin-scroll/infin-scroll.component';
import { RouterModule, Routes } from '@angular/router';
import { PickerDemoComponent } from './demos/picker-demo/picker-demo.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewDatePickerDemoComponent } from './demos/new-date-picker-demo/new-date-picker-demo.component';
import { MyDatePickerComponent } from './components/my-date-picker/my-date-picker.component';
import { MonthPickerComponent } from './components/my-date-picker/date-picker-types/month-picker.component';
import { YearPickerComponent2 } from './components/my-date-picker/date-picker-types/year-picker.component';
import { RegularPickerComponent } from './components/my-date-picker/date-picker-types/regular-picker.component';
import { PeriodPickerComponent } from './components/my-date-picker/date-picker-types/period-picker.component';
import { ShowDatePickerPipe } from './components/my-date-picker/show-date-picker.pipe';
import { TotalDatePickerComponent } from './components/my-date-picker/total-date-picker/total-date-picker.component';
import { DefaultDatePickerComponent } from './components/my-date-picker/default-date-picker/default-date-picker.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarWrapperComponent } from './components/calendar/details/calendar-wrapper/calendar-wrapper.component';
import { DatePickerComponent } from './components/calendar/details/date-picker/date-picker.component';
import { YearPickerComponent } from './components/calendar/details/year-picker/year-picker.component';
import { CMonthDropdownComponent } from './components/calendar/details/date-picker/c-month-dropdown/c-month-dropdown.component';
import { DatePeriodComponent } from './components/calendar/details/date-period/date-period.component';
import { CYearDropdownComponent } from './components/calendar/details/date-picker/c-year-dropdown/c-year-dropdown.component';
import { DateFormatComponent } from './components/calendar/details/date-format/date-format.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  { path: 'datePicker', component: PickerDemoComponent },
  { path: 'newDatePicker', component: NewDatePickerDemoComponent },
  { path: 'infin', component: InfinScrollComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MyDatePickerComponent,
    MonthPickerComponent,
    YearPickerComponent2,
    RegularPickerComponent,
    PeriodPickerComponent,
    ShowDatePickerPipe,
    TotalDatePickerComponent,
    DefaultDatePickerComponent,
    InfinScrollComponent,
    PickerDemoComponent,
    NewDatePickerDemoComponent,
    CalendarComponent,
    CalendarWrapperComponent,
    DatePickerComponent,
    YearPickerComponent,
    CMonthDropdownComponent,
    DatePeriodComponent,
    CYearDropdownComponent,
    DateFormatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }
    ),
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
