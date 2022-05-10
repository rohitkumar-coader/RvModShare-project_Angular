import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowProfileComponent } from './follow-profile.component';

describe('FollowProfileComponent', () => {
  let component: FollowProfileComponent;
  let fixture: ComponentFixture<FollowProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
