import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess
} from './albums.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchAlbumsLoading: false,
  creatingLoading: false,
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchAlbumsLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({...state, fetchAlbumsLoading: false, albums})),
  on(fetchAlbumsFailure, state => ({...state, fetchAlbumsLoading: false})),
  on(createAlbumRequest, state => ({...state, creatingLoading: true})),
  on(createAlbumSuccess, state => ({...state, creatingLoading: false})),
  on(createAlbumFailure, state => ({...state, creatingLoading: false})),
);
