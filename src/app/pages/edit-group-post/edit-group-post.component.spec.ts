import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupPostComponent } from './edit-group-post.component';

describe('EditGroupPostComponent', () => {
  let component: EditGroupPostComponent;
  let fixture: ComponentFixture<EditGroupPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
