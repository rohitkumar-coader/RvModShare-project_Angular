import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModTypeFollowComponent } from './mod-type-follow.component';

describe('ModTypeFollowComponent', () => {
  let component: ModTypeFollowComponent;
  let fixture: ComponentFixture<ModTypeFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModTypeFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModTypeFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
