import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapsModule } from 'src/libs/maps/maps.module';
import { RouterModule } from '@angular/router';
import { RoutingModule } from 'src/libs/routing/routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationModule } from 'src/libs/authentication/authentication.module';
import { NotFoundInterceptor } from 'src/libs/routing/interceptors/not-found.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    MapsModule,
    AuthenticationModule,
    RoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NotFoundInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
