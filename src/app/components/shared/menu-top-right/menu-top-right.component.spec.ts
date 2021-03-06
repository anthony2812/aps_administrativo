import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTopRightComponent } from './menu-top-right.component';

describe('MenuTopRightComponent', () => {
  let component: MenuTopRightComponent;
  let fixture: ComponentFixture<MenuTopRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTopRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTopRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
