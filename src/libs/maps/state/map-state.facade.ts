import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMapState } from './map-state.state';

import * as MapActions from './map-state.actions';
import * as MapSelectors from './map-state.selectors';
import { Observable, filter } from 'rxjs';
import { Marker, Place } from '../models/map.models';

@Injectable({
  providedIn: 'root',
})
export class PlacesFacade {
  public constructor(private readonly store: Store<IMapState>) {}

  public fetchPlaces(filter: string | null = null): void {
    this.store.dispatch(MapActions.fetchPlaces({ filter: filter }));
  }

  public getPlaces(): Observable<Place[]> {
    return this.store
      .select(MapSelectors.placesState)
      .pipe(filter((x): x is Place[] => !!x));
  }

  public getRoute(): Observable<google.maps.DirectionsRequest> {
    return this.store
      .select(MapSelectors.routeState)
      .pipe(filter((x): x is google.maps.DirectionsRequest => !!x));
  }

  public changeOrigin(place: Marker): void {
    const originMarker: Marker = {
      lat: place.lat,
      lng: place.lng,
    };

    this.store.dispatch(MapActions.changeFromRoute({ origin: originMarker }));
  }

  public changeDestination(place: Marker): void {
    const originMarker: Marker = {
      lat: place.lat,
      lng: place.lng,
    };

    this.store.dispatch(
      MapActions.changeToRoute({ destination: originMarker })
    );
  }

  public fetchCities(): void {
    this.store.dispatch(MapActions.fetchCities());
  }

  public getCities(): Observable<string[]> {
    return this.store
      .select(MapSelectors.citiesState)
      .pipe(filter((x): x is string[] => !!x));
  }
}
