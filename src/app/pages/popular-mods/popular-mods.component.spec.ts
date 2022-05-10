import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularModsComponent } from './popular-mods.component';

describe('PopularModsComponent', () => {
  let component: PopularModsComponent;
  let fixture: ComponentFixture<PopularModsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularModsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularModsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
