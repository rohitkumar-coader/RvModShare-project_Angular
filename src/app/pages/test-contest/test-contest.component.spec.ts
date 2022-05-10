import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestContestComponent } from './test-contest.component';

describe('TestContestComponent', () => {
  let component: TestContestComponent;
  let fixture: ComponentFixture<TestContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
