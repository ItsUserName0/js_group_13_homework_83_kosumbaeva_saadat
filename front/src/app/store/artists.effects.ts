import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArtistsService } from '../services/artists.service';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class ArtistsEffects {

  constructor(private actions: Actions,
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

}
