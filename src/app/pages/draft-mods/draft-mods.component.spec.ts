import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftModsComponent } from './draft-mods.component';

describe('DraftModsComponent', () => {
  let component: DraftModsComponent;
  let fixture: ComponentFixture<DraftModsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftModsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftModsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
