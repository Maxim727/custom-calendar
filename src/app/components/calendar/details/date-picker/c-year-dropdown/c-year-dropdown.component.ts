import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-c-year-dropdown',
  templateUrl: './c-year-dropdown.component.html',
  styleUrls: ['./c-year-dropdown.component.scss']
})
export class CYearDropdownComponent implements OnInit {

  isOpen = false;

  @Input() list: ICDropdown[] = [];

  @Input() selectedItem: any;
  @Output() selectedItemChange = new EventEmitter<ICDropdown>();

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(item: ICDropdown) {
    console.log(item);
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
    this.isOpen = false;
  }
}

export interface ICDropdown {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}


