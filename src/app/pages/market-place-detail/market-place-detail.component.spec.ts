import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceDetailComponent } from './market-place-detail.component';

describe('MarketPlaceDetailComponent', () => {
  let component: MarketPlaceDetailComponent;
  let fixture: ComponentFixture<MarketPlaceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPlaceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPlaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
