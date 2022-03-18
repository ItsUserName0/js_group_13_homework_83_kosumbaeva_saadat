import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TracksService } from '../services/tracks.service';
import { HelpersService } from '../services/helpers.service';
import { fetchTracksFailure, fetchTracksRequest, fetchTracksSuccess } from './tracks.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TracksEffects {

  constructor(private actions: Actions,
              private tracksService: TracksService,
              private helpers: HelpersService) {
  }

  fetchTracks = createEffect(() => this.actions.pipe(
    ofType(fetchTracksRequest),
    mergeMap(({id}) => this.tracksService.getTracks(id).pipe(
      map(tracks => fetchTracksSuccess({tracks})),
      catchError(() => {
        this.helpers.openSnackBar('Could not fetch tracks');
        return of(fetchTracksFailure);
      })
    ))
  ));
}
