import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess
} from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchArtistLoading: false,
  creatingLoading: false,
  creatingError: null,
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchArtistLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => ({...state, fetchArtistLoading: false, artists})),
  on(fetchArtistsFailure, state => ({...state, fetchArtistLoading: false})),
  on(createArtistRequest, state => ({...state, createLoading: true, creatingError: null})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({...state, createLoading: false, creatingError: error})),
);
