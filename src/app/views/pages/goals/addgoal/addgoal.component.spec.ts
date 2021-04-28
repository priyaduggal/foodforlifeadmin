import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgoalComponent } from './addgoal.component';

describe('AddgoalComponent', () => {
  let component: AddgoalComponent;
  let fixture: ComponentFixture<AddgoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
