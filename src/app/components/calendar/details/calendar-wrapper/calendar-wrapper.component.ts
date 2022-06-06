import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-wrapper',
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.scss']
})
export class CalendarWrapperComponent implements OnInit {
  options = [
    { id: 1, name: 'День' },
    { id: 2, name: 'Год' },
    { id: 3, name: 'Период' },
  ];
  selectedOption: MyOption = this.options[0];
  dateToSubmit: any;

  public currentDate!: moment.Moment;

  constructor() { }

  ngOnInit(): void {
    this.dateToSubmit = moment(this.currentDate).format('DD.MM.YYYY');
  }

  selectOption(option: MyOption) {
    this.selectedOption = option;
    switch (this.selectedOption.id) {
      case 1:
        this.dateToSubmit = moment(this.currentDate).format('DD.MM.YYYY');
        break
      case 2:
        this.dateToSubmit = moment(this.currentDate).format('YYYY');
        break
      case 3:
        break
    }
  }

  getDate($event: any) {
    this.dateToSubmit = $event
  }

  submitForm() {
    console.warn(this.dateToSubmit, 'submit')
  }

  cancelForm() {
    console.warn('Cancel')
  }
}


interface MyOption {
  id: number;
  name: string;
}
