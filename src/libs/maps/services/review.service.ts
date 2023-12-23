import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadNewReview } from '../models/review.models';
import { appApi } from 'src/app/const-variables.models';
import { AuthenticationService } from 'src/libs/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  addReview(review: UploadNewReview): Observable<any> {
    const data = new FormData();
    data.append('comment', review.comment);
    data.append('rating', review.rating.toString());

    const userId = this.authService.user?.id;
    if (userId) {
      data.append('userId', userId.toString());
    }

    const params = new HttpParams().set('placeId', review.placeId.toString());

    const headers = new HttpHeaders();

    return this.http.post(`${appApi}/reviews/place/${review.placeId}`, data, {
      headers,
      params,
    });
  }

  deleteReview(placeId: string, reviewId: string): Observable<void> {
    return this.http.delete<void>(
      appApi + `/reviews/place/${placeId}/review/${reviewId}`
    );
  }
}
