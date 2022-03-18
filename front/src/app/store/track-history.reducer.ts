import { createReducer, on } from '@ngrx/store';
import { addTrackToHistoryFailure, addTrackToHistoryRequest, addTrackToHistorySuccess } from './track-history.actions';
import { TrackHistoryState } from './types';

const initialState: TrackHistoryState = {
  addLoading: false,
}

export const trackHistoryReducer = createReducer(
  initialState,
  on(addTrackToHistoryRequest, state => ({...state, addLoading: true})),
  on(addTrackToHistorySuccess, state => ({...state, addLoading: false})),
  on(addTrackToHistoryFailure, state => ({...state, addLoading: false})),
);
