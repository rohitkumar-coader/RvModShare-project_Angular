import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsModsComponent } from './tags-mods.component';

describe('TagsModsComponent', () => {
  let component: TagsModsComponent;
  let fixture: ComponentFixture<TagsModsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsModsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsModsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
