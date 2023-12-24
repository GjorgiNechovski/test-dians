import { User } from 'src/libs/authentication/models/user.models';
import { Place } from './map.models';

export class Review {
  constructor(
    public id: number,
    public comment: string,
    public rating: number,
    public place: Place,
    public user: User
  ) {}
}

export class UploadNewReview {
  constructor(
    public comment: string,
    public rating: string,
    public placeId: string
  ) {}
}
