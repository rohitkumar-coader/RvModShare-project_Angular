import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeListingModalComponent } from './like-listing-modal.component';

describe('LikeListingModalComponent', () => {
  let component: LikeListingModalComponent;
  let fixture: ComponentFixture<LikeListingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeListingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeListingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
