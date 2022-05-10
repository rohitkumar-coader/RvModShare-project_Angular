import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCategoriesComponent } from './follow-categories.component';

describe('FollowCategoriesComponent', () => {
  let component: FollowCategoriesComponent;
  let fixture: ComponentFixture<FollowCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
