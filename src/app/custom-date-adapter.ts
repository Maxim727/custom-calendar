import { Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { isMoment, Moment } from "moment";
import { environment } from "src/environments/environment";
import * as moment from "moment";

const dateNames: string[] = [];
for (let date = 1; date <= 31; date++) {
  dateNames.push(String(date));
}

@Injectable()
export class CustomDateAdapter extends DateAdapter<Moment> {

  private localeData = moment.localeData();
  
  format(date: Moment, displayFormat: any): string {
    if (date) {
      return date.format(displayFormat);
    }
    return '';
  }

  invalid(): Moment {
    return moment();
  };

  getYear(date: Moment): number {
    return date.year();
  }

  getMonth(date: Moment): number {
    return date.month();
  }

  getDate(date: Moment): number {
    return date.date();
  }

  getDayOfWeek(date: Moment): number {
    return date.day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    this.setLocale(localStorage.getItem('curLangMoment') || environment.defaultLang);
    switch (style) {
      case 'long':
        return this.localeData.months();
      case 'short':
        return this.localeData.monthsShort();
      case 'narrow':
        return this.localeData.monthsShort().map(month => month[0]);
    }
  }

  getDateNames(): string[] {
    return dateNames;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    this.setLocale(localStorage.getItem('curLangMoment') || environment.defaultLang);
    switch (style) {
      case 'long':
        return this.localeData.weekdays();
      case 'short':
        return this.localeData.weekdaysShort();
      case 'narrow':
        return this.localeData.weekdaysShort();
    }
  }

  getYearName(date: Moment): string {
    return String(date.year());
  }

  getFirstDayOfWeek(): number {
    this.setLocale(localStorage.getItem('curLangMoment') || environment.defaultLang);
    return this.localeData.firstDayOfWeek();
  }

  getNumDaysInMonth(date: Moment): number {
    return date.daysInMonth();
  }

  clone(date: Moment): Moment {
    return date.clone();
  }

  createDate(year: number, month: number, date: number): Moment {
    return moment([year, month, date]);
  }

  today(): Moment {
    return moment();
  }

  parse(value: any, parseFormat: any): Moment | null {
    let m = moment(value, parseFormat, true);
    if (!m.isValid()) {
      m = moment(value);
    }
    if (m.isValid()) {
      return m;
    }
    return null;
  }

  addCalendarYears(date: Moment, years: number): Moment {
    return date.clone().add(years, 'y');
  }

  addCalendarMonths(date: Moment, months: number): Moment {
    return date.clone().add(months, 'M');
  }

  addCalendarDays(date: Moment, days: number): Moment {
    return date.clone().add(days, 'd');
  }

  setLocale(locale: any): void {
    this.localeData = moment.localeData(locale);
  }

  compareDate(first: Moment, second: Moment): number {
    return first.diff(second, 'seconds', true);
  }

  sameDate(first: any | Moment, second: any | Moment): boolean {
    if (first == null) {
      return second == null;
    } else if (isMoment(first)) {
      return first.isSame(second);
    }
    return super.sameDate(first, second);
  }

  clampDate(date: Moment, min?: any | Moment, max?: any | Moment): Moment {
    if (min && date.isBefore(min)) {
      return min;
    } else if (max && date.isAfter(max)) {
      return max;
    }
    return date;
  }

  isValid(date: Moment): boolean {
    return date.isValid();
  };

  isDateInstance(obj: Object): boolean {
    return moment.isMoment(obj);
  };

  toIso8601(date: Moment): string {
    return date.format();
  };

  fromIso8601(iso8601String: string): Moment {
    return moment(iso8601String);
  }

}