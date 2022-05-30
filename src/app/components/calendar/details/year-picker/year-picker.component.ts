import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash'

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss']
})
export class YearPickerComponent implements OnInit {
  selectedDate: any;
  years: any[] = [];
  currentDate!: moment.Moment;

  @Output() submittedDate = new EventEmitter();
  submitDate() { this.submittedDate.emit(this.selectedDate); }

  constructor() { }

  ngOnInit(): void {
    this.currentDate = moment();
    console.log(this.selectedDate);

    this.selectedDate = moment(this.currentDate).format('YYYY');
    console.log(this.selectedDate);

    this.generateCalendar()
  }

  private generateCalendar(): void {
    this.years = this.fillDates(this.currentDate);
  }

  private fillDates(currentMoment: moment.Moment) {
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

  private isToday(date: any): boolean {
    return moment().isSame(moment(date), 'year')
  }

  private isSelected(date: any): boolean {
    return this.selectedDate === moment(date).format('YYYY');
  }

  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('YYYY');
    this.generateCalendar();
    this.submitDate()
  }

  public nextYear(): void {
    this.currentDate = moment(this.currentDate).add(12, 'year')
    this.generateCalendar()
  }

  public prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(12, 'year')
    this.generateCalendar()
  }
}
