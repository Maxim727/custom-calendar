import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CYearDropdownComponent } from './c-year-dropdown.component';

describe('CYearDropdownComponent', () => {
  let component: CYearDropdownComponent;
  let fixture: ComponentFixture<CYearDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CYearDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CYearDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
