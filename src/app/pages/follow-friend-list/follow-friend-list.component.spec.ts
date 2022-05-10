import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowFriendListComponent } from './follow-friend-list.component';

describe('FollowFriendListComponent', () => {
  let component: FollowFriendListComponent;
  let fixture: ComponentFixture<FollowFriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowFriendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
