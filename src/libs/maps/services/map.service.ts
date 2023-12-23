import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { appApi } from '../../../app/const-variables.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Place,
  UploadEditLocationModel,
  UploadLocationModel,
} from '../models/map.models';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getLocations(filter: string | null): Observable<Place[]> {
    if (filter != null) {
      return this.http.get<any[]>(appApi + '/places?' + filter).pipe(
        map((apiResponse: any[]) => {
          return apiResponse.map((apiLocation: any) => {
            return new Place(
              apiLocation.id,
              apiLocation.name,
              apiLocation.city,
              apiLocation.xcoordinate,
              apiLocation.ycoordinate,
              apiLocation.hasEntranceFee,
              apiLocation.website,
              apiLocation.openingHours,
              apiLocation.phoneNumber,
              apiLocation.type,
              apiLocation.image,
              apiLocation.rating,
              apiLocation.imageUrl,
              apiLocation.reviews
            );
          });
        })
      );
    }
    return this.http.get<any[]>(appApi + '/places').pipe(
      map((apiResponse: any[]) => {
        return apiResponse.map((apiLocation: any) => {
          return new Place(
            apiLocation.id,
            apiLocation.name,
            apiLocation.city,
            apiLocation.xcoordinate,
            apiLocation.ycoordinate,
            apiLocation.hasEntranceFee,
            apiLocation.website,
            apiLocation.openingHours,
            apiLocation.phoneNumber,
            apiLocation.type,
            apiLocation.image,
            apiLocation.rating,
            apiLocation.imageUrl,
            apiLocation.reviews
          );
        });
      })
    );
  }

  getCities(): Observable<string[]> {
    return this.http.get<string[]>(appApi + '/places/cities');
  }

  uploadLocation(location: UploadLocationModel): Observable<void> {
    const data = new FormData();
    data.append('name', location.name);
    data.append('xCoordinate', location.xCoordinate);
    data.append('yCoordinate', location.yCoordinate);
    data.append('type', location.type);

    if (location.imageUrl !== null) {
      data.append('image', location.imageUrl);
    }

    data.append('city', location.city);
    if (location.phoneNumber !== null) {
      data.append('phoneNumber', location.phoneNumber);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<void>(appApi + '/places/addLocation', data, {
      headers,
    });
  }

  editLocation(location: UploadEditLocationModel): Observable<void> {
    const data = new FormData();
    data.append('name', location.name);
    data.append('xCoordinate', location.xCoordinate);
    data.append('yCoordinate', location.yCoordinate);
    data.append('type', location.type);
    data.append('city', location.city);

    if (location.phoneNumber !== null) {
      data.append('phoneNumber', location.phoneNumber);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<void>(
      appApi + `/places/${location.id}/editLocation`,
      data,
      {
        headers,
      }
    );
  }

  public deleteLocation(userId: number, placeId: number): Observable<void> {
    return this.http.delete<void>(
      appApi + `/places/delete?userId=${userId}&placeId=${placeId}`
    );
  }

  public getLocationById(id: number): Observable<Place> {
    return this.http.get<Place>(appApi + '/places/id/' + id);
  }
}
