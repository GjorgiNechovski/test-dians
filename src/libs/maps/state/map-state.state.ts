import { Place } from '../models/map.models';

export const MAP_STORE_KEY = 'product-state';

export interface IMapState {
  places: Place[];
  route: google.maps.DirectionsRequest;
  cities: string[];
}

export const initialState: IMapState = {
  places: [],
  route: {
    destination: { lat: 0, lng: 0 },
    origin: { lat: 0, lng: 0 },
    travelMode: google.maps.TravelMode.DRIVING,
  },
  cities: [],
};
