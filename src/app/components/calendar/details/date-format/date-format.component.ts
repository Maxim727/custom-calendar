import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss']
})
export class DateFormatComponent implements OnInit {

  constructor() { }

  formats = [
    { id: 1, name: 'День' },
    { id: 2, name: 'Месяц' },
    { id: 3, name: 'Год' },
  ];

  selectedFormat: MyFormat = this.formats[0];
  ngOnInit(): void {
  }

  selectFormat(format: MyFormat){
    console.warn(format)
    this.selectedFormat = format
  }

}

interface MyFormat {
  id: number;
  name: string;
}

