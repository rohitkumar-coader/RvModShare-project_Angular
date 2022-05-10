import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocialPostComponent } from './edit-social-post.component';

describe('EditSocialPostComponent', () => {
  let component: EditSocialPostComponent;
  let fixture: ComponentFixture<EditSocialPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSocialPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSocialPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
