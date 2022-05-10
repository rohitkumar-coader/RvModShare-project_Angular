import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListingComponent } from './friends-listing.component';

describe('FriendsListingComponent', () => {
  let component: FriendsListingComponent;
  let fixture: ComponentFixture<FriendsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
