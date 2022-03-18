import { createAction, props } from '@ngrx/store';
import { TrackHistory, TrackOfTrackHistory } from '../models/track-history.model';

export const addTrackToHistoryRequest = createAction('[TrackHistory] Add Request', props<{ trackHistoryData: TrackOfTrackHistory }>());
export const addTrackToHistorySuccess = createAction('[TrackHistory] Add Success');
export const addTrackToHistoryFailure = createAction('[TrackHistory] Add Failure');

export const fetchTrackHistoryRequest = createAction('[TrackHistory] Fetch Request');
export const fetchTrackHistorySuccess = createAction('[TrackHistory] Fetch Success', props<{ tracks: TrackHistory[] }>());
export const fetchTrackHistoryFailure = createAction('[TrackHistory] Fetch Failure');
