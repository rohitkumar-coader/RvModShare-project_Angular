import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModsSharedComponent } from './mods-shared.component';

describe('ModsSharedComponent', () => {
  let component: ModsSharedComponent;
  let fixture: ComponentFixture<ModsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
