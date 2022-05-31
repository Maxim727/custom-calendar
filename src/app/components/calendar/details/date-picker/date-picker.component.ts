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
  public currentDate!: moment.Moment;
  public namesOfDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  public weeks: Array<CalendarDate[]> = [];
  public selectedDate: any;

  monthes: any;
  years: any;
  curMonth: any;
  curYear: any;

  @ViewChild('calendar', { static: true }) calendar: any;
  @Output() submittedDate = new EventEmitter();
  @Input() month: any;
  @Input() year: any;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = moment();
    this.selectedDate = moment(this.currentDate).format('DD.MM.YYYY');
    this.generateCalendar();

    this.curYear = moment(this.currentDate).format('DD.MM.YYYY').slice(6,10);

    this.years = this.getYears(this.currentDate)
    this.monthes = this.getMonthes(this.currentDate)
  }

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private fillDates(currentMoment: moment.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days').add(1, 'days');
    const lastDayOfGrid = moment(currentMoment).endOf('month').subtract(lastOfMonth, 'days').add(7, 'days');

    const startCalendar = firstDayOfGrid.date();

    return _.range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  private getYears(currentMoment: moment.Moment) {
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


  private getMonthes(currentMoment: moment.Moment) {
   // console.warn(moment.months());
    return moment.months()
    // let substracted = moment(currentMoment).subtract(11, 'year')
    // let added = moment(currentMoment).add(12, 'year')
    // const starter = substracted.year()

    // return _.range(starter, starter + added.diff(this.currentDate, 'year')).map((date) => {
    //   const newDate = moment(this.currentDate).year(date);
    //   return {
    //     today: this.isToday(newDate),
    //     selected: this.isSelected(newDate),
    //     mDate: newDate,
    //   };
    // });
  }

  // receiveSelectedYear($event: any) {
  //   //console.log($event);

  //   this.curYear = $event?.mDate?.format('YYYY')
  //   console.log(this.curYear, 'curYear');


  // }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD.MM.YYYY');
  }

  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  public isDisabledMonth(currentDate: moment.MomentInput): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, 'months');
  }

  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.currentDate, 'month') && moment(date).isSameOrBefore(today);
  }


  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('DD.MM.YYYY');
    this.generateCalendar();
    this.submittedDate.emit(this.selectedDate)

    //this.currentDate = this.curYear?.mDate
    // console.warn(this.currentDate, 'curDate')
    // console.warn(this.curMonth, 'curMonth');
    // console.warn(this.curYear?.mDate), 'curYear';

  }

  public isDayBeforeLastSat(date: moment.Moment): boolean {
    const lastSat = moment().weekday(-1);
    return moment(date).isSameOrBefore(lastSat);
  }

}

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}
