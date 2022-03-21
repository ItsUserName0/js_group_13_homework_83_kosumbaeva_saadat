import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArtistsService } from '../services/artists.service';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()
export class ArtistsEffects {

  constructor(private actions: Actions,
              private router: Router,
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
      catchError(() => {
        this.helpers.openSnackBar('Could not create artist');
        return of(createArtistFailure());
      })
    ))
  ))

}
