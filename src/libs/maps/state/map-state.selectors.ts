import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMapState, MAP_STORE_KEY } from './map-state.state';

const state = createFeatureSelector<IMapState>(MAP_STORE_KEY);

export const placesState = createSelector(
  state,
  (state1: IMapState) => state1.places
);

export const routeState = createSelector(state, (state1: IMapState) => {
  const route = state1.route;
  if (route) {
    return {
      ...route,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  }
  return route;
});

export const citiesState = createSelector(
  state,
  (state1: IMapState) => state1.cities
);
