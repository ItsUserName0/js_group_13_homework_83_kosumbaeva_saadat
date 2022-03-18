import { Injectable } from '@angular/core';
import { TrackHistoryService } from '../services/track-history.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../services/helpers.service';
import { addTrackToHistoryFailure, addTrackToHistoryRequest, addTrackToHistorySuccess } from './track-history.actions';
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
