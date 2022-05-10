import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareModsComponent } from './share-mods.component';

describe('ShareModsComponent', () => {
  let component: ShareModsComponent;
  let fixture: ComponentFixture<ShareModsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareModsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareModsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
