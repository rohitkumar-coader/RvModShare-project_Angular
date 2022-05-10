import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerModalComponent } from './follower-modal.component';

describe('FollowerModalComponent', () => {
  let component: FollowerModalComponent;
  let fixture: ComponentFixture<FollowerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
