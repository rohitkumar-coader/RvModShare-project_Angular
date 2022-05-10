import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RvHelpComponent } from './rv-help.component';

describe('RvHelpComponent', () => {
  let component: RvHelpComponent;
  let fixture: ComponentFixture<RvHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RvHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RvHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
