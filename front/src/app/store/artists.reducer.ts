import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import {
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess
} from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchArtistLoading: false,
  fetchArtistError: null,
  albums: [],
  fetchAlbumsLoading: false,
  fetchAlbumsError: null,
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchArtistLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => {
    return {...state, fetchArtistLoading: false, artists};
  }),
  on(fetchArtistsFailure, (state, {error}) => {
    return {...state, fetchArtistLoading: false, fetchArtistError: error};
  }),
  on(fetchAlbumsRequest, state => ({...state, fetchAlbumsLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => {
    return {...state, fetchAlbumsLoading: false, albums};
  }),
  on(fetchAlbumsFailure, (state, {error}) => {
    return {...state, fetchAlbumsLoading: false, fetchAlbumsError: error};
  }),
);
