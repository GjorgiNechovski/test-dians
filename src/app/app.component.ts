import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/libs/authentication/services/authentication.service';
import { PlacesFacade } from 'src/libs/maps/state/map-state.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(
    private placesFacade: PlacesFacade,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.fetchCurrentUser();
    this.placesFacade.fetchCities();
    this.placesFacade.fetchPlaces();
  }
}
