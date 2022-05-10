import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnifyImageComponent } from './magnify-image.component';

describe('MagnifyImageComponent', () => {
  let component: MagnifyImageComponent;
  let fixture: ComponentFixture<MagnifyImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagnifyImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnifyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
