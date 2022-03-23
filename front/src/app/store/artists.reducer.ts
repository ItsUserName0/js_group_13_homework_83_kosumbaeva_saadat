import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistFailure,
  publishArtistRequest,
  publishArtistSuccess,
  removeArtistFailure,
  removeArtistRequest,
  removeArtistSuccess
} from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchArtistLoading: false,
  creatingLoading: false,
  creatingError: null,
  removingLoading: false,
  publishLoading: false,
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchArtistLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => ({...state, fetchArtistLoading: false, artists})),
  on(fetchArtistsFailure, state => ({...state, fetchArtistLoading: false})),
  on(createArtistRequest, state => ({...state, createLoading: true, creatingError: null})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({...state, createLoading: false, creatingError: error})),
  on(removeArtistRequest, state => ({...state, removingLoading: true})),
  on(removeArtistSuccess, state => ({...state, removingLoading: false})),
  on(removeArtistFailure, state => ({...state, removingLoading: false})),
  on(publishArtistRequest, state => ({...state, publishLoading: true})),
  on(publishArtistSuccess, state => ({...state, publishLoading: false})),
  on(publishArtistFailure, state => ({...state, publishLoading: false})),
);
