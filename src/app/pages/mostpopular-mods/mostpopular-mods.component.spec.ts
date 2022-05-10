import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostpopularModsComponent } from './mostpopular-mods.component';

describe('MostpopularModsComponent', () => {
  let component: MostpopularModsComponent;
  let fixture: ComponentFixture<MostpopularModsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostpopularModsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostpopularModsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
