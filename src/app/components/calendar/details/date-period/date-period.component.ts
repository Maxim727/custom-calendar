import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-period',
  templateUrl: './date-period.component.html',
  styleUrls: ['./date-period.component.scss']
})
export class DatePeriodComponent implements OnInit {
  public monthBefore!: moment.Moment;
  startDate: any;
  endDate: any;
  submittingDate = [
    { start: '' },
    { end: '' }];

  @Output() submittedDate = new EventEmitter();
  submitDate() { this.submittedDate.emit(this.submittingDate); }

  constructor() { }

  ngOnInit(): void {
    this.monthBefore = moment(this.monthBefore).subtract(1, 'month')
  }

  getStart($event: any) {
    this.submittingDate[0] = $event;
  }

  getEnd($event: any) {
    this.submittingDate[1] = $event;
    this.submitDate()
  }

//
}
interface DatePeriod {
  start: number;
  end: number;
}
