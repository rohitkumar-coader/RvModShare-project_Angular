import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPostDetailComponent } from './poll-post-detail.component';

describe('PollPostDetailComponent', () => {
  let component: PollPostDetailComponent;
  let fixture: ComponentFixture<PollPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
