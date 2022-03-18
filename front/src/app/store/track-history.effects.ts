import { Injectable } from '@angular/core';
import { TrackHistoryService } from '../services/track-history.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../services/helpers.service';
import {
  addTrackToHistoryFailure,
  addTrackToHistoryRequest,
  addTrackToHistorySuccess,
  fetchTrackHistoryFailure,
  fetchTrackHistoryRequest,
  fetchTrackHistorySuccess
} from './track-history.actions';
import { catchError, map, mergeMap, NEVER, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable({
  providedIn: 'root'
})
export class TrackHistoryEffects {

  constructor(private actions: Actions,
              private trackHistoryService: TrackHistoryService,
              private helpers: HelpersService,
              private store: Store<AppState>) {
  }

  fetchTrackHistory = createEffect(() => this.actions.pipe(
    ofType(fetchTrackHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.trackHistoryService.getTrackHistory(user.token).pipe(
          map(tracks => fetchTrackHistorySuccess({tracks})),
          catchError(() => {
            this.helpers.openSnackBar('Could not get track history');
            return of(fetchTrackHistoryFailure());
          })
        )
      }

      return NEVER;
    })
  ));

  addTrackToHistory = createEffect(() => this.actions.pipe(
    ofType(addTrackToHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([track, user]) => {
      if (user) {
        return this.trackHistoryService.addTrackToHistory({
          track: track.trackHistoryData.track,
          token: user.token
        }).pipe(
          map(() => addTrackToHistorySuccess()),
          catchError(() => {
            this.helpers.openSnackBar('Could not add track to history');
            return of(addTrackToHistoryFailure());
          })
        );
      }

      return NEVER;
    })
  ));

}
