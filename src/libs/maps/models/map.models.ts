import { Review } from './review.models';

export interface Marker {
  lat: number;
  lng: number;
}

export class Place {
  public position: google.maps.LatLng;

  constructor(
    public id: number,
    public name: string,
    public city: string,
    public xcoordinate: number,
    public ycoordinate: number,
    public hasEntranceFee: boolean | null,
    public website: string | null,
    public openingHours: string | null,
    public phoneNumber: string | null,
    public type: string | null,
    public image: string,
    public rating: number,
    public imageUrl: string,
    public reviews: Review[]
  ) {
    this.position = new google.maps.LatLng(xcoordinate, ycoordinate);
  }

  calculateAverageRating(): number {
    if (this.reviews.length === 0) {
      return 0;
    }

    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / this.reviews.length;

    return averageRating;
  }
}

export class UploadLocationModel {
  constructor(
    public name: string,
    public xCoordinate: string,
    public yCoordinate: string,
    public city: string,
    public imageUrl: File,
    public phoneNumber: string,
    public type: string
  ) {}
}

export class UploadEditLocationModel {
  constructor(
    public id: string,
    public name: string,
    public xCoordinate: string,
    public yCoordinate: string,
    public city: string,
    public phoneNumber: string,
    public type: string
  ) {}
}
