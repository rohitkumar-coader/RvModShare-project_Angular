import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaTestComponent } from './alpha-test.component';

describe('AlphaTestComponent', () => {
  let component: AlphaTestComponent;
  let fixture: ComponentFixture<AlphaTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphaTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
