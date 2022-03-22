import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TracksService } from '../services/tracks.service';
import { HelpersService } from '../services/helpers.service';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess, removeTrackFailure, removeTrackRequest, removeTrackSuccess
} from './tracks.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class TracksEffects {

  constructor(private actions: Actions,
              private router: Router,
              private store: Store<AppState>,
              private tracksService: TracksService,
              private helpers: HelpersService) {
  }

  fetchTracks = createEffect(() => this.actions.pipe(
    ofType(fetchTracksRequest),
    mergeMap(({albumId}) => this.tracksService.getTracks(albumId).pipe(
      map(tracks => fetchTracksSuccess({tracks})),
      catchError(() => {
        this.helpers.openSnackBar('Could not fetch tracks');
        return of(fetchTracksFailure);
      })
    ))
  ));

  createTrack = createEffect(() => this.actions.pipe(
    ofType(createTrackRequest),
    mergeMap(({trackData}) => this.tracksService.createTrack(trackData).pipe(
      map(() => createTrackSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => {
        this.helpers.openSnackBar('Could not create track');
        return of(createTrackFailure({error: 'Wrong data!'}));
      }),
    ))
  ));

  removeTrack = createEffect(() => this.actions.pipe(
    ofType(removeTrackRequest),
    mergeMap(({deletingId, albumId}) => this.tracksService.removeTrack(deletingId).pipe(
      map(() => removeTrackSuccess()),
      tap(() => this.store.dispatch(fetchTracksRequest({albumId}))),
      this.helpers.catchServerError(removeTrackFailure),
    ))
  ));

}
