import { createReducer, on } from '@ngrx/store';
import { ArtistsState } from './types';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';

const initialState: ArtistsState = {
  artists: [],
  fetchArtistLoading: false,
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchArtistLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => ({...state, fetchArtistLoading: false, artists})),
  on(fetchArtistsFailure, state => ({...state, fetchArtistLoading: false})),
);
