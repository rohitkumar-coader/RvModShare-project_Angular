import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowModsListComponent } from './follow-mods-list.component';

describe('FollowModsListComponent', () => {
  let component: FollowModsListComponent;
  let fixture: ComponentFixture<FollowModsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowModsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowModsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
