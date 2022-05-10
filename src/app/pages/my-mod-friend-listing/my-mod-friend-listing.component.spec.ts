import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModFriendListingComponent } from './my-mod-friend-listing.component';

describe('MyModFriendListingComponent', () => {
  let component: MyModFriendListingComponent;
  let fixture: ComponentFixture<MyModFriendListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyModFriendListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyModFriendListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
