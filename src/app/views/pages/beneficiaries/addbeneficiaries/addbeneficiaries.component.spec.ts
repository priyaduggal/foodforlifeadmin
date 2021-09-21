import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbeneficiariesComponent } from './addbeneficiaries.component';

describe('AddbeneficiariesComponent', () => {
  let component: AddbeneficiariesComponent;
  let fixture: ComponentFixture<AddbeneficiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbeneficiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
