import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchAlbumsFailure, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AlbumsService } from '../services/albums.service';

@Injectable()
export class AlbumsEffects {
  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(({id}) => this.albumsService.fetchAlbums(id).pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => of(fetchAlbumsFailure({error: 'Something went wrong while getting the list of albums'}))),
    ))
  ));

  constructor(private actions: Actions, private albumsService: AlbumsService) {
  }
}
