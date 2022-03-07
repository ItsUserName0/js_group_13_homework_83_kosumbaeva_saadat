import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchArtistLoading: false,
  fetchArtistError: null,
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchArtistLoading: true, fetchArtistError: null})),
  on(fetchArtistsSuccess, (state, {artists}) => {
    return {...state, fetchArtistLoading: false, artists};
  }),
  on(fetchArtistsFailure, (state, {error}) => {
    return {...state, fetchArtistLoading: false, fetchArtistError: error};
  }),
);
