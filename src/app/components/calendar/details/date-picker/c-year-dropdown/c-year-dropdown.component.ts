import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-c-year-dropdown',
  templateUrl: './c-year-dropdown.component.html',
  styleUrls: ['./c-year-dropdown.component.scss']
})
export class CYearDropdownComponent implements OnInit, OnChanges {

  isOpen = false;

  @Input() list: ICDropdown[] = [];
  @Input() selectedItem: any;

  @Output() selectedItemChange = new EventEmitter<ICDropdown>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(JSON.stringify(changes));
    this.selectedItem = changes
  }

  selectItem(item: ICDropdown) {
    //console.log(item, 'dropdown');
    this.selectedItem = item.mDate.format('YYYY');

    this.selectedItemChange.emit(this.selectedItem);
    this.isOpen = false;
  }
}

export interface ICDropdown {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}


