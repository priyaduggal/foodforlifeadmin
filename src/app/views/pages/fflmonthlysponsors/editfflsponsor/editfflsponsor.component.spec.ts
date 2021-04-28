import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfflsponsorComponent } from './editfflsponsor.component';

describe('EditfflsponsorComponent', () => {
  let component: EditfflsponsorComponent;
  let fixture: ComponentFixture<EditfflsponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfflsponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfflsponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
