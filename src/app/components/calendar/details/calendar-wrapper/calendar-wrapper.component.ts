import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dateToSubmit = moment(this.currentDate).format('DD.MM.YYYY');
  }

  selectOption(option: MyOption) {
    this.selectedOption = option;
    switch (this.selectedOption.id) {
      case 1:
        this.currentDate = moment(this.currentDate).subtract(1, 'month')
        this.dateToSubmit = moment(this.currentDate).format('DD.MM.YYYY');
        break
      case 2:
        this.dateToSubmit = ['01-01-'+moment(this.currentDate).format('YYYY'), '31-12-'+moment(this.currentDate).format('YYYY')]
        break
      case 3:
        this.dateToSubmit = [moment(this.currentDate).subtract(1, 'month').format('DD.MM.YYYY'), moment(this.currentDate).format('DD.MM.YYYY')]
        break
    }
  }

  getDate($event: any) {
    this.dateToSubmit = $event
  }

  getDatePeriod($event: any){
    this.dateToSubmit = $event
  }

  submitForm() {
    console.warn(this.dateToSubmit, 'submit')
    this.dialog.closeAll(

      );
  }

  cancelForm() {
    console.warn('Cancel')
    this.dialog.closeAll(
    );
  }
}


interface MyOption {
  id: number;
  name: string;
}
