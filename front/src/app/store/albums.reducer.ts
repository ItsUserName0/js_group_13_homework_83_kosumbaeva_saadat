import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchAlbumsFailure, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchAlbumsLoading: false,
  fetchAlbumsError: null,
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchAlbumsLoading: true, fetchAlbumsError: null})),
  on(fetchAlbumsSuccess, (state, {albums}) => {
    return {...state, fetchAlbumsLoading: false, albums};
  }),
  on(fetchAlbumsFailure, (state, {error}) => {
    return {...state, fetchAlbumsLoading: false, fetchAlbumsError: error};
  }),
);
