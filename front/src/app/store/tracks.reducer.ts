import { TracksState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchTracksFailure, fetchTracksRequest, fetchTracksSuccess } from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTracksSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTracksFailure, state => ({...state, fetchLoading: false})),
);
