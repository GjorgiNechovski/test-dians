import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from '../services/map.service';
import { map, switchMap } from 'rxjs';
import * as MapActions from './map-state.actions';

@Injectable()
export class MapEffects {
  constructor(private actions$: Actions, private service: MapService) {}

  fetchPlaces$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MapActions.fetchPlaces),
      switchMap((action) =>
        this.service
          .getLocations(action.filter)
          .pipe(
            map((response) =>
              MapActions.fetchPlacesSuccess({ places: response })
            )
          )
      )
    );
  });

  fetchCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MapActions.fetchPlaces),
      switchMap(() =>
        this.service
          .getCities()
          .pipe(
            map((response) =>
              MapActions.fetchCitiesSuccess({ cities: response })
            )
          )
      )
    );
  });
}
