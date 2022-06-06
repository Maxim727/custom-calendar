import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash'
import { ICDropdown } from './c-month-dropdown/c-month-dropdown.component';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})

export class DatePickerComponent implements OnInit {
  currentDate!: moment.Moment;
  namesOfDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  weeks: Array<CalendarDate[]> = [];
  selectedDate: any;

  monthes: any;
  years: any;
  selectedMonth: any;
  selectedYear: any;
  substracted!: moment.Moment;

  @ViewChild('calendar', { static: true }) calendar: any;
  @Output() submittedDate = new EventEmitter();
  @Input() month: any;
  @Input() year: any;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = moment();

    this.selectedDate = moment(this.currentDate).format('DD.MM.YYYY');
    this.generateCalendar();

    this.selectedYear = this.selectedDate.slice(6, 10);
    this.selectedMonth = moment(this.currentDate);

    this.years = this.getYears(this.currentDate)
    this.monthes = this.getMonthes()
  }

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days').add(1, 'days');
    console.log(firstDayOfGrid, 'firstDayOfGrid');

    const lastDayOfGrid = moment(currentMoment).endOf('month').subtract(lastOfMonth, 'days').add(8, 'days');
    console.log(lastDayOfGrid, 'lastDayOfGrid')

    const startCalendar = firstDayOfGrid.date();
    console.log(startCalendar, 'startCalendar')

    return _.range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  getYears(currentMoment: moment.Moment) {
    let substracted = moment(currentMoment).subtract(11, 'year')
    let added = moment(currentMoment).add(12, 'year')
    const starter = substracted.year()

    return _.range(starter, starter + added.diff(this.currentDate, 'year')).map((date) => {
      const newDate = moment(this.currentDate).year(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  getMonthes() {
    return Array.apply(0, Array(12)).map(function(_,i){return moment().month(i)})
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD.MM.YYYY');
  }

  prevMonth(): void {
    this.selectedMonth = moment(this.currentDate).subtract(1, 'months');
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.selectedMonth = moment(this.currentDate).add(1, 'months');
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  isDisabledMonth(currentDate: moment.MomentInput): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, 'months');
  }

  isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.currentDate, 'month') ;
    //return moment(date).isSame(this.currentDate, 'month') && moment(date).isSameOrBefore(today);
  }

  isDayBeforeLastSat(date: moment.Moment): boolean {
    const lastSat = moment().weekday(-1);
    return moment(date).isSameOrBefore(lastSat);
  }

  selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('DD.MM.YYYY');
    this.selectedDate = this.selectedDate.slice(0, -4) + this.selectedYear;
    this.submittedDate.emit(this.selectedDate)
    this.generateCalendar();
  }

  receiveSelectedYear($event: any) {
    this.selectedYear = $event;
    //getting the current year
    let varY: any = this.currentDate.format('YYYY')
    //getting the chosen year
    this.currentDate = moment(this.currentDate).subtract((varY) - this.selectedYear, 'year')
    this.selectedDate = this.selectedDate.slice(0, -4) + this.selectedYear;
    this.submittedDate.emit(this.selectedDate)
    this.generateCalendar()
  }

  receiveSelectedMonth($event: any) {
    this.selectedMonth = $event
    this.currentDate = this.selectedMonth
    this.selectedDate = this.selectedDate.slice(0, 3) + $event.format('MM') + '.'+ this.selectedYear
    let varY: any = this.currentDate.format('YYYY')
    //getting the chosen year
    this.currentDate = moment(this.currentDate).subtract((varY) - this.selectedYear, 'year')
    this.submittedDate.emit(this.selectedDate)
    this.generateCalendar()
  }
}

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}
