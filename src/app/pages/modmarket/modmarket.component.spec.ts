import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModmarketComponent } from './modmarket.component';

describe('ModmarketComponent', () => {
  let component: ModmarketComponent;
  let fixture: ComponentFixture<ModmarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModmarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
