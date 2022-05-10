import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSponsoredComponent } from './right-sponsored.component';

describe('RightSponsoredComponent', () => {
  let component: RightSponsoredComponent;
  let fixture: ComponentFixture<RightSponsoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSponsoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSponsoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
