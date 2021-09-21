import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbeneficiariesComponent } from './editbeneficiaries.component';

describe('EditbeneficiariesComponent', () => {
  let component: EditbeneficiariesComponent;
  let fixture: ComponentFixture<EditbeneficiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbeneficiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
