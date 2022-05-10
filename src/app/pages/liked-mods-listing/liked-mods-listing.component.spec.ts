import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedModsListingComponent } from './liked-mods-listing.component';

describe('LikedModsListingComponent', () => {
  let component: LikedModsListingComponent;
  let fixture: ComponentFixture<LikedModsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedModsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedModsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
