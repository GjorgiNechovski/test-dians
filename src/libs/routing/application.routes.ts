import { Routes } from '@angular/router';
import MapComponent from '../maps/components/map/map.component';
import { LocationsListComponent } from '../maps/components/locations-list/locations-list.component';
import { AddLocationComponent } from '../maps/components/add-location/add-location.component';
import { LogInComponent } from '../authentication/components/log-in/log-in.component';
import { RegisterComponent } from '../authentication/components/register/register.component';
import { EditLocationComponent } from '../maps/components/edit-location/edit-location.component';
import { Component404 } from './components/404/404.component';
import { Component403 } from './components/403/403.component';
import { AdminGuard } from '../authentication/services/admin.guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'locationList',
    component: LocationsListComponent,
  },
  {
    path: 'addPlace',
    component: AddLocationComponent,
  },
  {
    path: 'editPlace/:id',
    canActivate: [AdminGuard],
    component: EditLocationComponent,
  },
  {
    path: '404',
    component: Component404,
  },
  {
    path: '403',
    component: Component403,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
