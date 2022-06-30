import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss']
})
export class DateFormatComponent implements OnInit {

  constructor() { }

  @Input() list: any[] = [];
  @Input() selectedItem: any;

  @Output() selectedItemChange = new EventEmitter();

   formats = [
    { id: 1, name: 'День' },
    { id: 2, name: 'Месяц' },
    { id: 3, name: 'Год' },
  ];

  selectedFormat: MyFormat = this.formats[0];
  ngOnInit(): void {
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedItemChange.emit(this.selectedItem);
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

