import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalSearchComponent } from './normal-search.component';

describe('NormalSearchComponent', () => {
  let component: NormalSearchComponent;
  let fixture: ComponentFixture<NormalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
