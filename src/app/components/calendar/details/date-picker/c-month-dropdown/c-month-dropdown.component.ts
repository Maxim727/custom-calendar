import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-c-month-dropdown',
  templateUrl: './c-month-dropdown.component.html',
  styleUrls: ['./c-month-dropdown.component.scss']
})
export class CMonthDropdownComponent implements OnInit {
  isOpen = false;

  @Input() list: any[] = [];
  @Input() selectedItem: any;

  @Output() selectedItemChange = new EventEmitter<ICDropdown>();

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(item: ICDropdown) {
    //console.log(item);
    this.selectedItem = item;
    this.selectedItemChange.emit(this.selectedItem);
    this.isOpen = false;
  }
}

export interface ICDropdown {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}
