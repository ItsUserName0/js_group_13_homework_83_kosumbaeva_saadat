import { TracksState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess, publishTrackFailure,
  publishTrackRequest,
  publishTrackSuccess,
  removeTrackFailure,
  removeTrackRequest,
  removeTrackSuccess
} from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  creatingLoading: false,
  creatingError: null,
  removingLoading: false,
  publishLoading: false,
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTracksSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTracksFailure, state => ({...state, fetchLoading: false})),
  on(createTrackRequest, state => ({...state, creatingLoading: true, creatingError: null})),
  on(createTrackSuccess, state => ({...state, creatingLoading: false})),
  on(createTrackFailure, (state, {error}) => ({...state, creatingLoading: false, creatingError: error})),
  on(removeTrackRequest, state => ({...state, removingLoading: true})),
  on(removeTrackSuccess, state => ({...state, removingLoading: false})),
  on(removeTrackFailure, state => ({...state, removingLoading: false})),
  on(publishTrackRequest, state => ({...state, publishLoading: true})),
  on(publishTrackSuccess, state => ({...state, publishLoading: false})),
  on(publishTrackFailure, state => ({...state, publishLoading: false})),
);
