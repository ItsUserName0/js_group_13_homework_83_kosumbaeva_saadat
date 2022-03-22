import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess
} from './albums.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AlbumsService } from '../services/albums.service';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()
export class AlbumsEffects {

  constructor(private actions: Actions,
              private router: Router,
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

}
