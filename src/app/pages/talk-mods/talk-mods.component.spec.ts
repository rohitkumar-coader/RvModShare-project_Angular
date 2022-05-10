import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkModsComponent } from './talk-mods.component';

describe('TalkModsComponent', () => {
  let component: TalkModsComponent;
  let fixture: ComponentFixture<TalkModsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkModsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkModsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
