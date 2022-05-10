import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RvInterestComponent } from './rv-interest.component';

describe('RvInterestComponent', () => {
  let component: RvInterestComponent;
  let fixture: ComponentFixture<RvInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RvInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RvInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
