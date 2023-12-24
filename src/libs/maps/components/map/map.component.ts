import { Component, OnInit } from '@angular/core';
import { Place } from '../../models/map.models';
import { LocationDetailsComponent } from '../location-details/location-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
} from 'rxjs';
import { PlacesFacade } from '../../state/map-state.facade';
import { MapDirectionsService } from '@angular/google-maps';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/libs/authentication/services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export default class MapComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  locations: Place[] = [];
  cities: string[] = [];
  mapLoaded: boolean = false;

  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(41.6086, 21.7453),
    disableDefaultUI: true,
  };

  request: google.maps.DirectionsRequest | null = null;

  directionsResults$: Observable<
    google.maps.DirectionsResult | null | undefined
  > = of(null);

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
    public modalService: NgbModal,
    private placesFacade: PlacesFacade,
    private mapDirectionsService: MapDirectionsService,
    private authService: AuthenticationService,
    private router: Router,
    httpClient: HttpClient
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1oO9jfpESXYSJOR6b2UUWAO2szfXc040',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );

    this.placesFacade.getRoute().subscribe((route) => {
      this.request = route;

      this.directionsResults$ = this.mapDirectionsService
        .route(this.request)
        .pipe(map((response) => response.result));
    });
  }

  ngOnInit(): void {
    this.placesFacade.getPlaces().subscribe((x) => {
      this.locations = x;
      this.mapLoaded = true;
    });

    //TODO: change with factory!
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

  goToLocationList(): void {
    this.router.navigate(['/locationList']);
  }

  goToAddLocation(): void {
    this.router.navigate(['/addPlace']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
