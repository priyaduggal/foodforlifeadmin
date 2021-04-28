import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FflmonthlysponsorsComponent } from './fflmonthlysponsors.component';

describe('FflmonthlysponsorsComponent', () => {
  let component: FflmonthlysponsorsComponent;
  let fixture: ComponentFixture<FflmonthlysponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FflmonthlysponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FflmonthlysponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
