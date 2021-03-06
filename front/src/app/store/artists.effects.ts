import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArtistsService } from '../services/artists.service';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistFailure,
  publishArtistRequest,
  publishArtistSuccess,
  removeArtistFailure,
  removeArtistRequest,
  removeArtistSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class ArtistsEffects {

  constructor(private actions: Actions,
              private router: Router,
              private store: Store<AppState>,
              private helpers: HelpersService,
              private artistsService: ArtistsService) {
  }

  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistsRequest),
    mergeMap(() => this.artistsService.fetchArtists().pipe(
      map(artists => fetchArtistsSuccess({artists})),
      catchError(() => {
        this.helpers.openSnackBar('Could not get artists');
        return of(fetchArtistsFailure());
      })),
    ))
  );

  createArtist = createEffect(() => this.actions.pipe(
    ofType(createArtistRequest),
    mergeMap(({artistData}) => this.artistsService.createArtist(artistData).pipe(
      map(() => {
        this.helpers.openSnackBar('Created successful');
        return createArtistSuccess();
      }),
      tap(() => this.router.navigate(['/'])),
      this.helpers.catchServerError(createArtistFailure),
    ))
  ))

  removeArtist = createEffect(() => this.actions.pipe(
    ofType(removeArtistRequest),
    mergeMap(({artistId}) => this.artistsService.removeArtist(artistId).pipe(
      map(() => removeArtistSuccess()),
      tap(() => this.store.dispatch(fetchArtistsRequest())),
      catchError(() => {
        this.helpers.openSnackBar('Could not delete artist');
        return of(removeArtistFailure());
      })
    ))
  ));

  publishArtist = createEffect(() => this.actions.pipe(
    ofType(publishArtistRequest),
    mergeMap(({id}) => this.artistsService.publishArtist(id).pipe(
      map(() => publishArtistSuccess()),
      tap(() => this.store.dispatch(fetchArtistsRequest())),
      catchError(() => {
        this.helpers.openSnackBar('Could not publish artist');
        return of(publishArtistFailure());
      })
    ))
  ));

}
