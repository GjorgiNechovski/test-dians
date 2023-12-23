import { Component, Input, OnInit } from '@angular/core';
import { PlacesFacade } from '../../state/map-state.facade';
import { MapService } from '../../services/map.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Place, UploadEditLocationModel } from '../../models/map.models';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
})
export class EditLocationComponent implements OnInit {
  @Input() place?: Place;

  editPlaceForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    xCoordinate: new FormControl(),
    yCoordinate: new FormControl(),
    city: new FormControl(),
    phoneNumber: new FormControl(),
    type: new FormControl(),
  });

  cities: string[] = [];

  constructor(
    private mapFacade: PlacesFacade,
    private mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mapFacade.getPlaces().subscribe((places) => {
      const currentURL = window.location.href;
      const parts = currentURL.split('/');
      const id = +parts[parts.length - 1];

      const foundPlace = places.find((place) => place.id === id);
      this.mapService.getLocationById(id).subscribe();

      this.editPlaceForm.patchValue({
        name: foundPlace!.name,
        xCoordinate: foundPlace!.position.lat,
        yCoordinate: foundPlace!.position.lng,
        city: foundPlace!.city,
        phoneNumber: foundPlace!.phoneNumber,
        type: foundPlace!.type,
      });
    });

    this.mapFacade.getCities().subscribe((x) => (this.cities = x));
  }

  onSubmit() {
    const name = this.editPlaceForm.controls['name'].value;
    const xCoordinate = this.editPlaceForm.controls['xCoordinate'].value;
    const yCoordinate = this.editPlaceForm.controls['yCoordinate'].value;
    const city = this.editPlaceForm.controls['city'].value;
    const phoneNumber = this.editPlaceForm.controls['phoneNumber'].value;
    const type = this.editPlaceForm.controls['type'].value;

    const uploadLocation = new UploadEditLocationModel(
      this.place!.id.toString(),
      name,
      xCoordinate,
      yCoordinate,
      city,
      phoneNumber,
      type
    );

    //TODO: Change it with shablon later on
    this.mapService.editLocation(uploadLocation).subscribe(() => {
      this.mapFacade.fetchPlaces();
      this.router.navigate(['map']);
    });
  }

  goToMap() {
    this.router.navigate(['/map']);
  }
}
