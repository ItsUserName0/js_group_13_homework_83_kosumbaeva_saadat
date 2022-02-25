import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArtistsService } from '../services/artists.service';
import {
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ArtistsEffects {
  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistsRequest),
    mergeMap(() => this.artistsService.fetchArtists().pipe(
      map(artists => fetchArtistsSuccess({artists})),
      catchError(() => of(fetchArtistsFailure({error: 'Something went wrong while getting the list of artists'}))),
    ))
  ));

  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(() => this.artistsService.fetchAlbums().pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => of(fetchAlbumsFailure({error: 'Something went wrong while getting the list of albums'}))),
    ))
  ));

  constructor(private actions: Actions, private artistsService: ArtistsService) {
  }
}
