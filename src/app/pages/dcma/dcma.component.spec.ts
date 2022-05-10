import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCMAComponent } from './dcma.component';

describe('DCMAComponent', () => {
  let component: DCMAComponent;
  let fixture: ComponentFixture<DCMAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCMAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCMAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
