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
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackHistoryEffects {

  constructor(private actions: Actions,
              private trackHistoryService: TrackHistoryService,
              private helpers: HelpersService) {
  }

  fetchTrackHistory = createEffect(() => this.actions.pipe(
    ofType(fetchTrackHistoryRequest),
    mergeMap(() => {
      return this.trackHistoryService.getTrackHistory().pipe(
        map(tracks => fetchTrackHistorySuccess({tracks})),
        catchError(() => {
          this.helpers.openSnackBar('Could not get track history');
          return of(fetchTrackHistoryFailure());
        })
      )
    })
  ));

  addTrackToHistory = createEffect(() => this.actions.pipe(
    ofType(addTrackToHistoryRequest),
    mergeMap(track => {
      return this.trackHistoryService.addTrackToHistory({track: track.trackHistoryData.track}).pipe(
        map(() => addTrackToHistorySuccess()),
        catchError(() => {
          this.helpers.openSnackBar('Could not add track to history');
          return of(addTrackToHistoryFailure());
        })
      );
    })
  ));

}
