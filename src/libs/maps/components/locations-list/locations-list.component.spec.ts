import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsListComponent } from './locations-list.component';

describe('LocationsListComponent', () => {
  let component: LocationsListComponent;
  let fixture: ComponentFixture<LocationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsListComponent]
    });
    fixture = TestBed.createComponent(LocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
