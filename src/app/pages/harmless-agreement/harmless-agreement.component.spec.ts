import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmlessAgreementComponent } from './harmless-agreement.component';

describe('HarmlessAgreementComponent', () => {
  let component: HarmlessAgreementComponent;
  let fixture: ComponentFixture<HarmlessAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarmlessAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarmlessAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
