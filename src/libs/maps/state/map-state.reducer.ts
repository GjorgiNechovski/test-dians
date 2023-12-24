import { createReducer, on } from '@ngrx/store';
import * as MapActions from './map-state.actions';
import { initialState } from './map-state.state';

export const MapReducer = createReducer(
  initialState,
  on(MapActions.fetchPlacesSuccess, (state, { places }) => {
    return {
      ...state,
      places: places,
    };
  }),
  on(MapActions.changeFromRoute, (state, { origin }) => ({
    ...state,
    route: {
      ...state.route,
      origin: { ...origin },
    },
  })),
  on(MapActions.changeToRoute, (state, { destination }) => ({
    ...state,
    route: {
      ...state.route,
      destination: { ...destination },
    },
  })),
  on(MapActions.fetchCitiesSuccess, (state, { cities }) => {
    return {
      ...state,
      cities: cities,
    };
  })
);
