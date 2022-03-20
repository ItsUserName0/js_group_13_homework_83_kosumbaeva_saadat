import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchAlbumsFailure, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AlbumsService } from '../services/albums.service';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class AlbumsEffects {

  constructor(private actions: Actions,
              private helpers: HelpersService,
              private albumsService: AlbumsService) {
  }

  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(({id}) => this.albumsService.fetchAlbums(id).pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => {
        this.helpers.openSnackBar('Could not get albums');
        return of(fetchAlbumsFailure());
      }),
    ))
  ));

}
