import { createReducer, on } from '@ngrx/store';
import {
  addTrackToHistoryFailure,
  addTrackToHistoryRequest,
  addTrackToHistorySuccess, fetchTrackHistoryFailure,
  fetchTrackHistoryRequest, fetchTrackHistorySuccess
} from './track-history.actions';
import { TrackHistoryState } from './types';

const initialState: TrackHistoryState = {
  tracks: [],
  fetchLoading: false,
  addLoading: false,
}

export const trackHistoryReducer = createReducer(
  initialState,
  on(fetchTrackHistoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchTrackHistorySuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTrackHistoryFailure, state => ({...state, fetchLoading: false})),
  on(addTrackToHistoryRequest, state => ({...state, addLoading: true})),
  on(addTrackToHistorySuccess, state => ({...state, addLoading: false})),
  on(addTrackToHistoryFailure, state => ({...state, addLoading: false})),
);
