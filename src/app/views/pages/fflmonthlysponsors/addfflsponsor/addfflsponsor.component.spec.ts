import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfflsponsorComponent } from './addfflsponsor.component';

describe('AddfflsponsorComponent', () => {
  let component: AddfflsponsorComponent;
  let fixture: ComponentFixture<AddfflsponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfflsponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfflsponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
