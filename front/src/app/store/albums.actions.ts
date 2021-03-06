import { createAction, props } from '@ngrx/store';
import { Album, AlbumData } from '../models/album.model';

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request', props<{ id?: string }>());
export const fetchAlbumsSuccess = createAction('[Albums] Fetch Success', props<{ albums: Album[] }>());
export const fetchAlbumsFailure = createAction('[Albums] Fetch Failure');

export const createAlbumRequest = createAction('[Albums] Create Request', props<{ albumData: AlbumData }>());
export const createAlbumSuccess = createAction('[Albums] Create Success');
export const createAlbumFailure = createAction('[Albums] Create Failure', props<{ error: null | string }>());

export const removeAlbumRequest = createAction('[Albums] Remove Request', props<{ albumId: string, artistId: string }>());
export const removeAlbumSuccess = createAction('[Albums] Remove Success');
export const removeAlbumFailure = createAction('[Albums] Remove Failure');

export const publishAlbumRequest = createAction('[Albums] Publish Request', props<{ albumId: string, artistId: string }>());
export const publishAlbumSuccess = createAction('[Albums] Publish Success');
export const publishAlbumFailure = createAction('[Albums] Publish Failure');
