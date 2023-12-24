import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import MapComponent from './components/map/map.component';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsRenderer,
} from '@angular/google-maps';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MAP_STORE_KEY } from './state/map-state.state';
import { MapReducer } from './state/map-state.reducer';
import { MapEffects } from './state/map-state.effects';
import { RouterModule } from '@angular/router';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { NaConvertPipe } from './pipes/na-convert.pipe';
import { PricePipe } from './pipes/price.pipe';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

@NgModule({
  declarations: [
    MapComponent,
    LocationDetailsComponent,
    LocationsListComponent,
    NaConvertPipe,
    PricePipe,
    AddLocationComponent,
    EditLocationComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature(MAP_STORE_KEY, MapReducer),
    EffectsModule.forFeature([MapEffects]),
  ],
  exports: [MapComponent, LocationDetailsComponent, LocationsListComponent],
  providers: [provideHttpClient(withJsonpSupport())],
})
export class MapsModule {}
