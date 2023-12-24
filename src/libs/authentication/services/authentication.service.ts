import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map } from 'rxjs';
import { appApi } from 'src/app/const-variables.models';
import { User } from '../models/user.models';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: User | null = null;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  logIn(email: string, password: string): Observable<User> {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient
      .post<User>(appApi + '/login', data, {
        headers,
      })
      .pipe(
        map((response: User) => {
          this.user = response;

          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000);
          document.cookie = `token=${
            response.id
          }; expires=${expirationDate.toUTCString()}`;

          return response;
        }),
        catchError((error: any) => {
          throw error;
        })
      );
  }

  register(name: string, email: string, password: string): Observable<void> {
    const data = new FormData();
    data.append('username', name);
    data.append('email', email);
    data.append('password', password);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<void>(appApi + '/register', data, {
      headers,
    });
  }

  public fetchCurrentUser(): void {
    const id = this.cookieService.getCookie('token');

    if (id !== null) {
      this.httpClient
        .get<User>(appApi + `/currentUser/${id}`)
        .pipe(filter((x) => x !== null))
        .subscribe((x) => {
          this.user = x;
        });
    }
  }

  public logout(): void {
    this.cookieService.deleteCookie('token');
    this.user = null;
  }
}
