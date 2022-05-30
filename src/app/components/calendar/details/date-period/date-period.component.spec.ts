import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePeriodComponent } from './date-period.component';

describe('DatePeriodComponent', () => {
  let component: DatePeriodComponent;
  let fixture: ComponentFixture<DatePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
