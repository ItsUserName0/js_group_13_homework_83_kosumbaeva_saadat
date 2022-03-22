import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess, removeAlbumFailure, removeAlbumRequest, removeAlbumSuccess
} from './albums.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AlbumsService } from '../services/albums.service';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class AlbumsEffects {

  constructor(private actions: Actions,
              private router: Router,
              private store: Store<AppState>,
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

  createAlbum = createEffect(() => this.actions.pipe(
    ofType(createAlbumRequest),
    mergeMap(({albumData}) => this.albumsService.createAlbum(albumData).pipe(
      map(() => createAlbumSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => {
        this.helpers.openSnackBar('Could not create album');
        return of(createAlbumFailure({error: 'Wrong data!'}));
      })
    ))
  ));

  removeAlbum = createEffect(() => this.actions.pipe(
    ofType(removeAlbumRequest),
    mergeMap(({albumId, artistId}) => this.albumsService.removeAlbum(albumId).pipe(
      map(() => removeAlbumSuccess()),
      tap(() => this.store.dispatch(fetchAlbumsRequest({id: artistId}))),
      catchError(() => {
        this.helpers.openSnackBar('Could not delete album');
        return of(removeAlbumFailure());
      }),
    )),
  ));

}
