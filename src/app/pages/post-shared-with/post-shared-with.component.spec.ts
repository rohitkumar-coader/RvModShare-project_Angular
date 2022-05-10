import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSharedWithComponent } from './post-shared-with.component';

describe('PostSharedWithComponent', () => {
  let component: PostSharedWithComponent;
  let fixture: ComponentFixture<PostSharedWithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSharedWithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSharedWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
