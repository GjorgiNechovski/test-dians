import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlacesFacade } from '../../state/map-state.facade';
import { Place } from '../../models/map.models';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationDetailsComponent } from '../location-details/location-details.component';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationsListComponent implements OnInit {
  places: Place[] = [];
  cities: string[] = [];

  showButtons = false;
  filtersActive = false;
  selectedFilter = 'All';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
    type: new FormControl(),
    fee: new FormControl(),
    city: new FormControl(),
  });

  constructor(
    private placesFacade: PlacesFacade,
    private router: Router,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.placesFacade.getPlaces().subscribe((x) => (this.places = x));

    this.searchForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((formValue) => {
        const queryParams: string[] = [];

        if (formValue.search) {
          queryParams.push(`search=${formValue.search}`);
        }
        if (formValue.type && formValue.type != 'All') {
          queryParams.push(`type=${formValue.type}`);
        }
        if (formValue.fee && formValue.fee !== '') {
          queryParams.push(`fee=${formValue.fee}`);
        }
        if (formValue.city && formValue.city !== '') {
          queryParams.push(`city=${formValue.city}`);
        }

        const queryString = queryParams.join('&');

        this.placesFacade.fetchPlaces(queryString);
      });

    this.placesFacade.getCities().subscribe((x) => (this.cities = x));
  }

  openLocationDetails(location: Place) {
    const modalRef = this.modalService.open(LocationDetailsComponent, {
      size: 'lg',
      windowClass: 'modal-class',
    });
    modalRef.componentInstance.place = location;

    modalRef.componentInstance.cancelModal.subscribe(() => {
      modalRef.close();
    });
  }

  showFilters(): void {
    this.showButtons = !this.showButtons;
    this.filtersActive = !this.filtersActive;
  }

  toggleFilters(filter: string): void {
    if (filter !== this.selectedFilter) {
      this.selectedFilter = filter;
      this.showButtons = true;
      this.searchForm.controls['type'].setValue(filter);
    } else {
      this.selectedFilter = 'All';
      this.showButtons = false;
      this.searchForm.controls['type'].setValue(filter);
    }
  }

  goToMap() {
    this.router.navigate(['/map']);
  }
}
