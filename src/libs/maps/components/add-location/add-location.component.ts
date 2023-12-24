import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlacesFacade } from '../../state/map-state.facade';
import { UploadLocationModel } from '../../models/map.models';
import { MapService } from '../../services/map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnInit {
  constructor(
    private mapFacade: PlacesFacade,
    private mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mapFacade.getCities().subscribe((x) => (this.cities = x));
  }

  addPlaceForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    xCoordinate: new FormControl(),
    yCoordinate: new FormControl(),
    city: new FormControl(),
    imageUrl: new FormControl(),
    phoneNumber: new FormControl(),
    type: new FormControl(),
  });

  cities: string[] = [];

  onSubmit() {
    const name = this.addPlaceForm.controls['name'].value;
    const xCoordinate = this.addPlaceForm.controls['xCoordinate'].value;
    const yCoordinate = this.addPlaceForm.controls['yCoordinate'].value;
    const city = this.addPlaceForm.controls['city'].value;
    const imageUrl = this.addPlaceForm.controls['imageUrl'].value;
    const phoneNumber = this.addPlaceForm.controls['phoneNumber'].value;
    const type = this.addPlaceForm.controls['type'].value;

    const uploadLocation = new UploadLocationModel(
      name,
      xCoordinate,
      yCoordinate,
      city,
      imageUrl,
      phoneNumber,
      type
    );

    //TODO: Change it with shablon later on
    this.mapService.uploadLocation(uploadLocation).subscribe(() => {
      this.mapFacade.fetchPlaces();
      this.router.navigate(['map']);
    });
  }

  uploadImage(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files !== null) {
        this.addPlaceForm.controls['imageUrl'].setValue(files[0]);
      }
    });

    fileInput.click();
  }

  goToMap() {
    this.router.navigate(['/map']);
  }
}
