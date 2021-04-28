import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqeditComponent } from './faqedit.component';

describe('FaqeditComponent', () => {
  let component: FaqeditComponent;
  let fixture: ComponentFixture<FaqeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
