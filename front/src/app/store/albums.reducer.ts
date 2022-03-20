import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchAlbumsFailure, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchAlbumsLoading: false,
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchAlbumsLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({...state, fetchAlbumsLoading: false, albums})),
  on(fetchAlbumsFailure, state => ({...state, fetchAlbumsLoading: false})),
);
