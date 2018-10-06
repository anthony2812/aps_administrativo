import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeControlsComponent } from './date-time-controls.component';

describe('DateTimeControlsComponent', () => {
  let component: DateTimeControlsComponent;
  let fixture: ComponentFixture<DateTimeControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
