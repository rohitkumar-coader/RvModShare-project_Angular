import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeFeedComponent } from './customize-feed.component';

describe('CustomizeFeedComponent', () => {
  let component: CustomizeFeedComponent;
  let fixture: ComponentFixture<CustomizeFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
