import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess, removeAlbumFailure, removeAlbumRequest, removeAlbumSuccess
} from './albums.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchAlbumsLoading: false,
  creatingLoading: false,
  creatingError: null,
  removingLoading: false,
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchAlbumsLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({...state, fetchAlbumsLoading: false, albums})),
  on(fetchAlbumsFailure, state => ({...state, fetchAlbumsLoading: false})),
  on(createAlbumRequest, state => ({...state, creatingLoading: true, creatingError: null})),
  on(createAlbumSuccess, state => ({...state, creatingLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({...state, creatingLoading: false, creatingError: error})),
  on(removeAlbumRequest, state => ({...state, removingLoading: true})),
  on(removeAlbumSuccess, state => ({...state, removingLoading: false})),
  on(removeAlbumFailure, state => ({...state, removingLoading: false})),
);
